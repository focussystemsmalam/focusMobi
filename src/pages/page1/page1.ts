import {Component, OnInit} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import {DEFAULT_SEARCH_STATE, FILE_TYPE, SEARCH_STATES, TREATMENT_TYPE} from "../../consts";
import {ServerService} from "../../services/server.service";
import {FilesResponse} from "../../server/server-models/responses";
import {FileModel} from "../../server/server-models/file-model";
import {LoadingService} from "../../services/loading";
import {SearchComponent} from "../search/search";

@Component({
  selector: 'page-page1',
  styles: [`
    .top-buttons {
      /*width: 95%;*/
      padding-top: 2%;
      /*height: 3.5em;*/
      height: 8.5%;
      display: flex;
      margin: auto auto 5%;

      z-index: 1;
      position: fixed;
      background-color: white;
      width: 100%;
    }

    .spacer {
      padding-top: 2%;
      height: 9%;
    }

    .top-buttons .button {
      width: 25%;
      margin-right: 1%;
      min-height: 35px;
      color: #d6dbe1;
      background-color: #3f6184;
      font-size: 100%;
    }

    .top-buttons .button:last-child {
      margin-right: 0;
    }

    .top-buttons .button.active {
      border-bottom: 5px solid #ff870d;
      font-weight: 600;
    }

    ion-title {

    }

    .white {
      color: #fdfdfd;
    }

    .welcome-msg {
      direction: rtl;
      padding-right: 7%;
    }

    .no-files-found {
      padding: 10%;
    }
  `],
  template: `
    <ion-header>
      <ion-navbar>
        <ion-grid>
          <ion-row>
            <ion-col>
              <button ion-button menuToggle>
                <ion-icon class="white" name="menu"></ion-icon>
              </button>
            </ion-col>
            <ion-col>
              <ion-title>{{serverService.companyName}}</ion-title>
            </ion-col>
            <ion-col>
              <ion-icon class="white" name="search"
                        (click)="presentSearchPopover($event)"
                        style="font-size: 30px; float: right;">
              </ion-icon>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-navbar>
    </ion-header>

    <ion-content has-bouncing="false" overflow-scroll="true">

      <!--<p class="welcome-msg">-->
      <!--ברוכים הבאים למערכת מעקב משלוחים Web Focus  -->
      <!--</p>-->

      <div class="top-buttons">
        <button class="button" [class.active]="curSearchState==search_states.JobOrders"
                (click)="stateClicked(search_states.JobOrders)">Job orders
        </button>
        <button class="button" [class.active]="curSearchState==search_states.Import"
                (click)="stateClicked(search_states.Import)">Import
        </button>
        <button class="button" [class.active]="curSearchState==search_states.Export"
                (click)="stateClicked(search_states.Export)">Export
        </button>
        <button class="button" [class.active]="curSearchState==search_states.Customs"
                (click)="stateClicked(search_states.Customs)">Customs
        </button>
      </div>
      <div class="spacer"></div>

      <mainTable *ngIf="files" [files]="files"></mainTable>
      <div class="no-files-found" *ngIf="!files || files.length==0">No Files Were Found..</div>

    </ion-content>
  `
})
export class Page1 implements OnInit {

  search_states = SEARCH_STATES;
  curSearchState: SEARCH_STATES = DEFAULT_SEARCH_STATE;

  files: FileModel[];

  constructor(public navCtrl: NavController,
              public loadingSrvc: LoadingService,
              public serverService: ServerService,
              private popoverCtrl: PopoverController) {

  }

  ngOnInit() {
    this.getMainDetails();
    this.serverService.searchParamsUpdated.subscribe(() => {
      this.getMainDetails();
    });
  }


  stateClicked(state: SEARCH_STATES) {
    this.curSearchState = state;
    this.getMainDetails();
  }

  getMainDetails() {
    this.serverService.mainSearchParams.fileType = '' + FILE_TYPE[this.curSearchState];
    this.serverService.mainSearchParams.treatmentType = '' + TREATMENT_TYPE[this.curSearchState];
    let sub = null;
    this.loadingSrvc.loading(true, sub);
    sub = this.serverService.getMainData().subscribe((filesRes: FilesResponse) => {
      this.files = filesRes.resultsCustoms || filesRes.resultsForawrd;
      this.loadingSrvc.loading(false);
    });

  }

  presentSearchPopover(myEvent) {
    let popover = this.popoverCtrl.create(SearchComponent);
    popover.present({
      ev: myEvent
    });
  }
}
