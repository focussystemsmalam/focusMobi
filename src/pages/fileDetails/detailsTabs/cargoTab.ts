/**
 * Created by eshel on 01/01/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {CargoObj} from "../../../server/server-models/responses";

@Component({
  selector: 'cargo-tab',
  template: `
<div class="regular-details-table">
    <div>
        <span>MAWB</span>
        <span>{{cargo.MblNo}}</span>
    </div>
    <div>
        <span>HAWB</span>
        <span>{{cargo.Hbl}}</span>
    </div>
    <div>
        <span>Manifest</span>
        <span>{{cargo.ManifestNo}}</span>
    </div>
    <div>
        <span>Payment</span>
        <span>{{cargo.PaymentTerms}}</span>
    </div>
</div>
`
})
export class CargoTab {
  @Input() cargo: CargoObj;
}
