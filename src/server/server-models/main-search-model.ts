/**
 * Created by Guy on 20/09/2016.
 */
import {FILE_STATES} from "../../consts";

export class MainSearch {
    // userName: string;
    // password: string;
    fileType: string = '';
    treatmentType: string = '';
    fileNum: string = '';
    orderNum: string = '';
    invoiceNum: string = '';
    fileState: string = FILE_STATES.OPEN+'';//default state is OPEN
    port: string = '';
    fromDate: string = '';
    toDate: string = '';
    transport: string = '';//default transport is AIR&SEA - ''
    hblHawb: string = '';
    mblMawb: string = '';


    updateValues(json: JSON) {
        for (let key in json) {
            this[key] = json[key];
        }
    }

    toJson() {
        let json:any = {};
        for (let key in this) {
            if (!(typeof this[key] === 'object' || typeof this[key] === 'function' ))
                json[key] = this[key];
        }

        return json;
    }


}
