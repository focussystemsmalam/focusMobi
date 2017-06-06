/**
 * Created by eshel on 21/01/2017.
 */
import {Component, Input} from "@angular/core";
import {ArchDocsObj, InvoiceResponse} from "../../../server/server-models/responses";
import {LoadingService} from "../../../services/loading";
import {FilesService} from "../../../services/files.service";
import {ServerService} from "../../../services/server.service";
@Component({
  selector: 'arcDocs-tab',
  styles: [`
.document-row{
    display: flex;
}

.document-row .item{
    position: relative;
    width: 23%;
    margin-right: 5%;/*Not in the Billing css*/
    padding: 5% 5% 1%;
}

.document-row .item:first-child{
  overflow: hidden;
  width: 27%;
}

.document-row .item:nth-child(2){
  padding-left: 2%;
}

.document-row .item:last-child{
  position: absolute;
  right: 0;
}

.icon{
  width: 70%;
    margin-top: -20%;
    margin-left: 50%;
}
`],
  template: `
<ion-list>
  <button ion-item *ngFor="let doc of arcDocs" (click)="getDocument(doc)">
    <div class="document-row">
      <span class="item">
            {{doc.Description}}
      </span>
      <span class="item">
            {{doc.ArchDate}}
      </span>
      <span class="item">
            {{doc.SerNo}}
      </span>
      <span class="item">
            <div class="icon" [ngClass]="getDocClass(doc)"></div><!--InvType?-->
      </span>
    </div>
  </button>
</ion-list>
`
})
export class ArcDocTab{

  @Input() arcDocs: ArchDocsObj[]

  constructor(private loadingService:LoadingService, private filesService:FilesService,private serverService:ServerService) {
  }

  getDocument(arcDoc: ArchDocsObj) {
    let sub = this.serverService.getArchDocs(arcDoc.SerNo+'').subscribe((doc: InvoiceResponse) => {
      this.loadingService.loading(false);

      if(!this.filesService.openDocument(doc,'archive document: ' + doc.inboxNumber)){
        this.loadingService.toastMsg('File type not supported');
      }
    });
    this.loadingService.loading(true, sub);
  }

  getDocClass(doc: ArchDocsObj){
    return this.filesService.getFileTypeClass(doc.Extenstion);
  }

}
