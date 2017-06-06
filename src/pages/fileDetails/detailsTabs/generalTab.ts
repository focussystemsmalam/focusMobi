/**
 * Created by eshel on 01/01/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {GeneralObj} from "../../../server/server-models/responses";

@Component({
    selector: 'general-tab',
    template: `
<div class="regular-details-table">
    <div>
        <span>Client Ref.</span>
        <span>-</span>
    </div>
    <div>
        <span>Open Date</span>
        <span>{{general.OpenDate}}</span>
    </div>
    <div>
        <span>Consignee</span>
        <span>{{general.Consignee}}</span>
    </div>
    <div>
        <span>State</span>
        <span>{{general.State}}</span>
    </div>
    <div>
        <span>Our Status</span>
        <span>{{general.Status}}</span>
    </div>
    <div>
        <span>Type</span>
        <span>{{transportType}}</span>
    </div>
</div>
`})
export class GeneralTab{
    @Input() general:GeneralObj;
    @Input() transportType:string;

}
