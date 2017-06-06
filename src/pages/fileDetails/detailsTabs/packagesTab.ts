/**
 * Created by eshel on 01/01/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {Package1Obj, Package2Obj} from "../../../server/server-models/responses";
import {FileModel} from "../../../server/server-models/file-model";

@Component({
  selector: 'packages-tab',
  styles: [`
label{
  font-weight: bold;
  margin: auto;
  padding: 2%;
}
.gray{
  background-color: #e3e3e3;
}
`],
  template: `
<div class="regular-details-table">
    <div *ngIf="file.TransportType == 'Sea'">
        <span>F.C.L/L.C.L</span>
        <span>{{file.FclLcl}}</span>
    </div>
    <div>
        <span>Goods</span>
        <span>{{package1.GoodsDesc}}</span>
    </div>
    <div>
        <span>Packages</span>
        <span>{{package1.PackageType}}</span>
    </div>
    <div>
        <span>Quantity</span>
        <span>{{package2.Quantity}}</span>
    </div>
    <div>
        <span>Weight</span>
        <span>{{package1.Weight}} Kg</span>
    </div>
    <div>
        <span>Volume</span>
        <span>{{package1.Volume}}</span>
    </div>
    <div>
        <span>Crg. Weight</span>
        <span>{{file.ChargeWeight}}</span>
    </div>
    <div>
      <label>Marks & Numbers</label>
    </div>
    <div *ngIf="file.TransportType == 'Sea'" class="gray">
        <span>Cont. & Seal.</span>
        <span>{{package2.MarksAndNumbers}}</span>
    </div>
    <!--<div class="gray">-->
        <!--<span>Seal No.</span>-->
        <!--<span>-</span>-->
    <!--</div>-->
    <div class="gray">
        <span>Description</span>
        <span>{{package2.Description}}</span>
    </div>
</div>
`})
export class PackagesTab{

  @Input() package1: Package1Obj;
  @Input() package2: Package2Obj;
  @Input() file    : FileModel;

}
