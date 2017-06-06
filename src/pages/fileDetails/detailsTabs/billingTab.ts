/**
 * Created by eshel on 01/01/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {InvoiceObj, InvoiceResponse} from "../../../server/server-models/responses";
import {LoadingService} from "../../../services/loading";
import {ServerService} from "../../../services/server.service";
import {FilesService} from "../../../services/files.service";
import {Cordova} from "@ionic-native/core";

@Component({
  selector: 'billing-tab',
  styles: [`
.document-row{
    display: flex;
}

.document-row .item{
    position: relative;
    width: 23%;
    /*margin-right: 2%;*/
    padding: 5% 5% 1%;
}

.document-row .item:nth-child(2){
  width: 33%;
  font-size: 110%;
  padding-top: 4.5%;
}
.document-row .item:nth-child(3){
  font-size: 110%;
  padding-top: 4.5%;
}


.document-row .item:last-child{
  position: absolute;
  right: 0;
}

.pdf-icon{
    width: 70%;
    margin-top: -20%;
    margin-left: 50%;
    content: url("assets/icons/pdf.svg");
}
`],
  template: `
<ion-list>
  <button ion-item *ngFor="let bill of bills" (click)="getDocument(bill)">
    <div class="document-row">
      <span class="item">
            {{bill.InvNo}}
      </span>
      <span class="item">
            {{bill.InvDate}}
      </span>
      <span class="item">
            {{bill.Amount}} {{bill.Currency}}
      </span>
      <span class="item">
            <div class="pdf-icon"></div><!--InvType?-->
      </span>
    </div>
  </button>
</ion-list>
`
})
export class BillingTab{

  @Input() bills: InvoiceObj[];

  constructor(
      private loadingSrvc  : LoadingService,
      private server       : ServerService,
      private filesService : FilesService) {}

  getDocument(bill: InvoiceObj) {
    this.loadingSrvc.loading(true);
    let sub = this.server.getInvoice(bill.InvNo+'')
        .subscribe((invoice: InvoiceResponse) => {
              this.loadingSrvc.loading(false);

              if(!this.filesService.openDocument(invoice,'invoice: ' + invoice.inboxNumber)){
                this.loadingSrvc.toastMsg('File type not supported');
              }

              sub.unsubscribe();
        });
  }

}
