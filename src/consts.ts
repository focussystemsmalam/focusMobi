/**
 * Created by Guy on 16/08/2016.
 */

export enum SEARCH_STATES{JobOrders = 0,Import,Export,Customs,Drop}
export const FILE_TYPE:number[]=[5,1,2,1,10];
export const TREATMENT_TYPE:number[]=[2,2,2,1,2];
export const DEFAULT_SEARCH_STATE=SEARCH_STATES.Import;
export const SEARCH_STATES_NAMES:string[]=['Job Orders','Import','Export','Customs','Drop'];

export enum DAYS_STATES{D7 = 7,D14 = 14,D21 = 21,MONTH = 30,AllTimes}

export enum FILE_STATES{ALL = 0,OPEN,CLOSE}
export const FILE_STATES_NAMES:string[]=['','1','2'];

export const FILE_STATES_ARRAY:any[]=[{code:'',type:'All'},{code:'1',type:'Open'},{code:'2',type:'Close'}];


//export enum TRANSPORT_STATES{AIR = 0,SEA,ALL}
export const TRANSPORT_STATES:any[]=[{code:4,type:'Air'},{code:1,type:'Sea'},{code:'',type:'Air & Sea'}];

export const COL_ORDER_MAIN_TABLE:string[] = ['State','FileNumber','OpenDate','TransportType'];

export const MAX_FAVORIT_FILES = 300;
