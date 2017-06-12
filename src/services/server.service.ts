import {EventEmitter, Injectable, Output} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {Config} from "../config";
import {LocalStorageService} from "./localStorage.service";
import {
  Companies,
  ExcelFileResponse,
  FileDetailsResponse,
  FilesResponse,
  InvoiceResponse,
  LogInResponse,
  PortsResponse,
  ServerUrlResponse
} from "../server/server-models/responses";
import {MainSearch} from "../server/server-models/main-search-model";
import {Observable} from "rxjs/Observable";
import {LoadingService} from "./loading";

@Injectable()
export class ServerService {
  username: string;
  password: string;
  serverURL: string;

  companyName:string;

  mainSearchParams: MainSearch = new MainSearch();

  @Output()
  searchParamsUpdated: EventEmitter<void> = new EventEmitter<void>();

  portsCache: PortsResponse;

  constructor(
      private http: Http,
      private localStorageService: LocalStorageService,
      private loadingService:LoadingService
  ){}

  //get companyID={COMPANY_ID}
  getServerURL(json: JSON) {
    let params: URLSearchParams = this.paramsGenerator(json, false);

    return this.http.get(Config.MainServerUrl + 'GetUrl', {search: params})
      .map(res => {
        let serverRes: ServerUrlResponse = new ServerUrlResponse(res.json());

        if(serverRes.secured == "0")
          { serverRes.url = 'http://' + serverRes.url; }
        else if (serverRes.secured == "1")
          { serverRes.url = 'https://' + serverRes.url; }
        this.serverURL = serverRes.url;
        return serverRes;
      });
  }

  getCompanies() {
    return this.http.get(Config.MainServerUrl + 'GetCompanies')
      .map(res => res.json())
      .map(json => {
        let comp: Companies = new Companies(json);
        return comp;
      })
      .catch(error=>{
        this.loadingService.loading(false);
        console.log("error");
        return Observable.of();
      });
  }

  //get userName={USERNAME}&password={PASSWORD}
  logIn(json: JSON) {
    this.username = json['userName'];
    this.password = json['password'];

    let params: URLSearchParams = this.paramsGenerator(json, false);

    return this.http.get(this.serverURL + 'GetLogin', {search: params})
      .map(res => {
        let loginRes: LogInResponse = new LogInResponse(res.json());
        if (loginRes.UserName) {
          //If the log in went successfully get the user ports.
          this.getPorts().subscribe();
        }
        return loginRes;
      });
  }

  /*get userName={USERNAME}&password={PASSWORD}&fileType={FILETYPE}&treatmentType={TREATMENTTYPE}&fileNum={FILENUM}&orderNum={ORDERNUM}&invoiceNum={INVOICENUM}&fileState={FILESTATE}&port={PORT}&fromDate={FROMDATE}&toDate={TODATE}&transport={TRANSPORT}&hblHawb={HBLHAWB}&mblMawb={MBLMAWB}*/
  getMainData() {
    let params: URLSearchParams = this.paramsGenerator(this.mainSearchParams.toJson());

    return this.http.get(this.serverURL + 'GetFilesForCustomer', {search: params})
      .map(res => {
        let filesRes: FilesResponse = new FilesResponse(res.json());
        return filesRes;
      }).catch(error=>{
        this.loadingService.loading(false);
        console.log("error");
        return Observable.of();
      });
  }

  /*userName={USERNAME}&password={PASSWORD}&fileType={FILETYPE}&treatmentType={TREATMENTTYPE}&fileNum={FILENUM}*/
  getFileDetails() {
    let params: URLSearchParams = this.paramsGenerator(this.mainSearchParams.toJson());

    return this.http.get(this.serverURL + 'GetFileDetails', {search: params})
      .map(res => {
        let fileDetails: FileDetailsResponse = new FileDetailsResponse(res.json());
        return fileDetails;
      }).catch(error=>{
        this.loadingService.loading(false);
        console.log("error" + error);

        return Observable.of();
      });
  }

  /*get userName={USERNAME}&password={PASSWORD}&inboxNum={INBOXNUM}&invoiceNum={INVOICENUM}*/
  getInvoice(invoiceNum: string) {
    //TODO remove ,inboxNum:invoiceNum - server bug
    let params: URLSearchParams = this.paramsGenerator(JSON.parse(JSON.stringify({
      invoiceNum: invoiceNum,
      inboxNum: invoiceNum
    })));

    return this.http.get(this.serverURL + 'GetInvoiceFromBinArchive', {search: params})
      .map(res => {
        let invoice: InvoiceResponse = new InvoiceResponse(res.json());
        return invoice;
      }).catch(error=>{
        this.loadingService.loading(false);
        console.log("error");
        return Observable.of();
      });
  }

  /*get userName={USERNAME}&password={PASSWORD}&inboxNum={INBOXNUM}*/
  getInbox(inboxNum: string) {
    let params: URLSearchParams = this.paramsGenerator(JSON.parse(JSON.stringify({inboxNum: inboxNum})));

    return this.http.get(this.serverURL + 'GetInboxItemFromBinArchive', {search: params})
      .map(res => {
        let invoice: InvoiceResponse = new InvoiceResponse(res.json());
        return invoice;
      }).catch(error=>{
        this.loadingService.loading(false);
        console.log("error");
        return Observable.of();
      });
  }

  /*get userName={USERNAME}&password={PASSWORD}&inboxNum={INBOXNUM}*/
  getArchDocs(inboxNum: string) {
    let params: URLSearchParams = this.paramsGenerator(JSON.parse(JSON.stringify({inboxNum: inboxNum})));

    return this.http.get(this.serverURL + 'GetArchDocsFromBinArchive', {search: params})
      .map(res => {
        let arcDoc: InvoiceResponse = new InvoiceResponse(res.json());
        return arcDoc;
      }).catch(error=>{
        this.loadingService.loading(false);
        console.log("error");
        return Observable.of();
      });
  }

  /*get userName={USERNAME}&password={PASSWORD}&portPreFix={PORTPREFIX}*/
  getPorts(json?: JSON) {
    if (this.portsCache) {
      return Observable.of(this.portsCache);
    }
    if (!json) {
      json = JSON.parse('{}');
      json['portPreFix'] = '';
    }

    let params: URLSearchParams = this.paramsGenerator(json);

    return this.http.get(this.serverURL + 'GetPorts', {search: params})
      .map(res => {
        let ports: PortsResponse = new PortsResponse(res.json());
        ports.results.unshift({portCode: '', portName: 'ALL PORTS'});
        this.portsCache = ports;
        return ports;
      }).catch(error=>{
        this.loadingService.loading(false);
        console.log("error");
        return Observable.of();
      });
  }

  /*get userName={USERNAME}&password={PASSWORD}&fileType={FILETYPE}&treatmentType={TREATMENTTYPE}&fileNum={FILENUM}&orderNum={ORDERNUM}&invoiceNum={INVOICENUM}&fileState={FILESTATE}&port={PORT}&fromDate={FROMDATE}&toDate={TODATE}&transport={TRANSPORT}&hblHawb={HBLHAWB}&mblMawb={MBLMAWB}*/
  getExcelFile() {
    let params: URLSearchParams = this.paramsGenerator(this.mainSearchParams.toJson());

    return this.http.get(this.serverURL + 'GetFilesForCustomerExcel', {search: params})
      .map(res => {
        let excel: ExcelFileResponse = new ExcelFileResponse(res.json());
        return excel;
      }).catch(error=>{
        this.loadingService.loading(false);
        console.log("error");
        return Observable.of();
      });
  }

  private paramsGenerator(json: JSON, withOuth: boolean = true) {
    let params: URLSearchParams = new URLSearchParams();
    for (let key in json) {
      params.set(key, json[key]);
    }
    if (withOuth) {
      params.set('userName', this.username);
      params.set('password', this.password);
    }

    return params;
  }

  updateSearchParams(params) {
    Object.assign(this.mainSearchParams, params);
    this.searchParamsUpdated.emit();
  }
}
