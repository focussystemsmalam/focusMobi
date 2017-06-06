export class FileModel {
  ArrivalDate: string;
  // ArrivalDate: Date;
  Carrier: string;
  ChargeWeight: number;
  Consignee: string;
  Country: string;
  CustomerCo: number;
  DepartureDate: string;
  // DepartureDate: Date;
  FclLcl: string;
  FileNumber: number;
  FlightNumber: number;
  ForeignPort: string;
  GoodsDescription: string;
  HBL: string;
  HblType: string;
  KindOfPackages: string;
  LocalPort: string;
  ManifestNumber: null;
  MblDate: null;
  MblNumber: number;
  OpenDate: string;
  // OpenDate: Date;
  OrderNumber: number;
  Quantity: number;
  State: string;
  Status: string;
  TermsOfDelivery: string;
  TermsOfPayment: string;
  TransportType: string;
  Vessel: string;
  Volume: number;
  Weight: number;

  constructor(json:JSON){
    Object.assign(this,json);

    // if(json['ArrivalDate'])
    //   this.ArrivalDate = new Date(json['ArrivalDate']);

    // if(json['DepartureDate'])
    //   this.DepartureDate = new Date(json['DepartureDate']);

    // if(json['OpenDate'])
    //   this.OpenDate = new Date(json['DepartureDate']);
  }
}

export class FavoriteFile{
    FileNumber: number;
    fileType: string;
}

export interface IFile{
    file:string,
    extension:string
}
