/**
 * Created by eshel on 01/01/2017.
 */
import {Component, Input} from "@angular/core";
import {InboxObj, InvoiceResponse} from "../../../server/server-models/responses";
import {ServerService} from "../../../services/server.service";
import {LoadingService} from "../../../services/loading";
import {FilesService} from "../../../services/files.service";

@Component({
  selector: 'documents-tab',
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
    margin-left: 85%;
}

`],
  template: `
<ion-list>
  <button ion-item *ngFor="let doc of documents" (click)="getDocument(doc)">
    <div class="document-row">
        <span class="item">
            {{doc.Subject}}
        </span>
      <span class="item">
            {{doc.Received}}
        </span>
      <span class="item">
           {{doc.SerNo}}
        </span>
      <span class="item">
      {{doc.Remarks}}
            <div class="icon" [ngClass]="getFileTypeClass(doc)"></div>
        </span>
    </div>
  </button>
</ion-list>
`})
export class DocumentsTab{

  @Input() documents: InboxObj[];

  constructor(
      private server       : ServerService,
      private loadingSrvc  : LoadingService,
      private filesService : FilesService) {}

  getDocument(doc: InboxObj) {
    let sub = this.server.getInbox(doc.SerNo+"")
        .subscribe((inbox: InvoiceResponse) => {
              this.loadingSrvc.loading(false);

              sub.unsubscribe();
              if(!this.filesService.openDocument(inbox,'inbox: '+inbox.inboxNumber)){
                this.loadingSrvc.toastMsg('File type not supported');
              }
        });
    this.loadingSrvc.loading(true, sub);
  }

  getFileTypeClass(doc: InboxObj):string {
    return this.filesService.getFileTypeClass(doc.extension);
  }

}
