import {FileModel} from "./file-model";

export class ServerUrlResponse {
  companyID: number;
  logoBase: string;//icon image base64
  url: string;
  secured: string;

  constructor(json:JSON){
    Object.assign(this,json);
  }
}

export class Companies {
  companies: {comanyName: string,companyID: number}[];

  constructor(json:JSON){
    Object.assign(this,json);
  }
}

export class LogInResponse {
  FileTypes: {
    Key: {fileType: number},Value: {treatmentType: number[]}
  }[];
  Reason: string;
  Result: string;
  UserName: string;

  constructor(json:JSON){
    Object.assign(this,json);
  }
}

export class PortsResponse {
  hasMore: boolean;
  length: number;
  results: {portCode: string, portName: string}[];

  constructor(json:JSON){
    Object.assign(this,json);
  }
}

export class InvoiceResponse {
  extension: string;
  file: string;
  inboxNumber: number;
  userName: string;

  constructor(json:JSON){
    Object.assign(this,json);
  }
}

export class FilesResponse {
  length: string;
  resultsCustoms: FileModel[];
  resultsForawrd: FileModel[];

  constructor(json:JSON){
    Object.assign(this,json);

    if(json) {
      if (json['resultsCustoms']) {
        this.resultsCustoms = [];
        for (let i = 0; i < json['resultsCustoms'].length; i++)
          this.resultsCustoms.push(new FileModel(json['resultsCustoms'][i]));
      }

      if (json['resultsForawrd']) {
        this.resultsForawrd = [];
        for (let i = 0; i < json['resultsForawrd'].length; i++)
          this.resultsForawrd.push(new FileModel(json['resultsForawrd'][i]));
      }
    }

  }
}

export class GeneralObj {
  Consignee: string;
  CustomsStation: string;
  Forwarder: string;
  OpenDate: string;
  OrderNo: string;
  ReshimonType: string;
  State: string;
  Status: string;

  constructor(json:JSON){
    Object.assign(this,json);
  }
}

export class PathObj {
  // ArrivalDate: Date;
  ArrivalDate: string;
  Carrier: string;
  CountryOfOrigin: string;
  FlightNo: string;
  LoadingPort: string;
  LocalPort: string;
  Vessel: string;
  DischargePort:string;

  constructor(json:JSON){
    Object.assign(this,json);
  }
}

export class CargoObj {
  Hbl: string;
  ManifestNo: string;
  // MblDate: Date;
  MblDate: string;
  MblNo: string;
  PaymentTerms: string;

  constructor(json:JSON){
    Object.assign(this,json);
  }
}

export class Package1Obj {
  GoodsDesc: string;
  PackageType: string;
  Quantity: number;
  Volume: string;
  Weight: string

  constructor(json:JSON){
    Object.assign(this,json);
  }
}

export class Package2Obj {
  Description: string;
  KindOfPackages: string;
  MarksAndNumbers: string;
  Quantity: number;

  constructor(json:JSON){
    Object.assign(this,json);
  }
}

export class InvoiceObj {
  Amount: string;
  Currency: string;
  Descr: string;
  // InvDate: Date;
  InvDate: string;
  InvNo: number;
  InvType: string;
  Lang: string;

  constructor(json:JSON){
    Object.assign(this,json);
  }
}

export class EventsObj {
  Comment: string;
  // Date: Date;
  Date: string;
  Description: string;
  Initiator: string;
  Time: string;

  constructor(json:JSON){
    Object.assign(this,json);
  }
}

export class TaxObj {
  AmountInNis: string;
  Description: string;

  constructor(json:JSON){
    Object.assign(this,json);
  }
}

export class InboxObj {
  Received: string;// 12/06/16 18:06
  Remarks: string;
  SerNo: number;//654894
  Subject: string;
  extension:string;

  constructor(json:JSON){
    Object.assign(this,json);
  }
}

export class ArchDocsObj{
  ArchDate:string;//date
  Description:string;
  Extenstion:string;
  SerNo:number;

  constructor(json:JSON){
    Object.assign(this,json);
  }
}

export class FileDetailsResponse {
  general: {
    length: number;
    results: GeneralObj[];
  };
  path: {
    length: number;
    results: PathObj[];
  };
  cargo: {
    length: number;
    results: CargoObj[];
  };
  packages1: {
    length: number;
    results: Package1Obj[];
  };
  packages2: {
    length: number;
    results: Package2Obj[];
  };
  archDocs:{
    length: number;
    results: ArchDocsObj[];
  }
  invoices: {
    length: number;
    results: InvoiceObj[];
  };
  events: {
    length: number;
    results: EventsObj[];
  };
  taxes: {
    lengthnumber;
    results: TaxObj[];
  };
  inbox: {
    length: number;
    results: InboxObj[];
  };
  userName: string;

  constructor(json:JSON) {
    Object.assign(this, json);

    // if (json) {
    //   if (json['path'] && json['path']['results'] && json['path']['results'][0] && json['path']['results'][0]['ArrivalDate'])
    //     this.path.results[0].ArrivalDate = new Date(json['path']['results'][0]['ArrivalDate']);
    //
    //   if (json['cargo'] && json['cargo']['results'] && json['cargo']['results'][0] && json['cargo']['results'][0]['MblDate'])
    //     this.cargo.results[0].MblDate = new Date(json['cargo']['results'][0]['MblDate']);
    //
    //   if (json['invoices'] && json['invoices']['results'] && json['invoices']['results'][0] && json['invoices']['results'][0]['InvDate'])
    //     this.invoices.results[0].InvDate = new Date(json['invoices']['results'][0]['InvDate']);
    //
    //   if (json['events'] && json['events']['results'] && json['events']['results'][0] && json['events']['results'][0]['Date'])
    //     this.events.results[0].Date = new Date(json['events']['results'][0]['Date']);
    // }
  }

}

export class ExcelFileResponse{
  extension:string;
  file:string;
  inboxNumber:number;
  userName:string;

  constructor(json:JSON){
    Object.assign(this,json);
  }
}
