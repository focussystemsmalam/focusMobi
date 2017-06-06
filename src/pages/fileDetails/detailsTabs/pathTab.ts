/**
 * Created by eshel on 01/01/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {PathObj} from "../../../server/server-models/responses";
import {ServerService} from "../../../services/server.service";
import {FileModel} from "../../../server/server-models/file-model";

@Component({
  selector: 'path-tab',
  template: `
<div class="regular-details-table">
    <div>
        <span>Carrier</span>
        <span>{{path.Carrier}}</span>
    </div>
    <div>
        <span *ngIf="file.TransportType == 'Air'">Flight No.</span>
        <span *ngIf="file.TransportType == 'Sea'">Voyage No.</span>
        <span>{{path.FlightNo}}</span>
    </div>
    <div>
        <span *ngIf="file.TransportType == 'Sea'">Vessel</span>
        <span *ngIf="file.TransportType == 'Air'">Airline</span>
        <span>{{path.Vessel}}</span>
    </div>
    <div>
        <span>ETD</span>
        <span>{{file.DepartureDate}}</span>
    </div>
    <div>
        <span>ETA</span>
        <span>{{path.ArrivalDate}}</span>
    </div>
    <div>
        <span>POL</span>
        <span>{{path.LoadingPort}}</span>
    </div>
    <div>
        <span>POD</span>
        <span>{{path.DischargePort}}</span>
    </div>
    <div>
        <span>Final Dest</span>
        <span>-</span>
    </div>
</div>
`
})
export class PathTab{

  @Input() path: PathObj;
  @Input() file: FileModel;

  constructor(private serverService: ServerService) {
  }

  // getDischargePort(): string {
  //   let fileType: number = +this.serverService.mainSearchParams.fileType;
  //   if (fileType == 1) {//Import
  //     return this.file.LocalPort;
  //   } else if (fileType == 2) {//Export
  //     return this.file.ForeignPort;
  //   }
  //
  //   return '-';
  // }
}
