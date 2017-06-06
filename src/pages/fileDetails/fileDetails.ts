/**
 * Created by eshel on 17/12/2016.
 * Modified by guy and ofek.
 */
import {Component, OnInit} from "@angular/core";
import {NavParams, Platform} from "ionic-angular";
import {FileModel} from "../../server/server-models/file-model";
import {ServerService} from "../../services/server.service";
import {FileDetailsResponse} from "../../server/server-models/responses";
import {LoadingService} from "../../services/loading";
import {FILE_TYPE, SEARCH_STATES_NAMES, TREATMENT_TYPE} from "../../consts";

@Component({
    selector: 'file-details',
    template: `
        <ion-header>
            <ion-navbar>
                <button ion-button menuToggle>
                    <ion-icon class="white" name="menu"></ion-icon>
                </button>
                <ion-title>{{fileSearchType}} File: {{file.FileNumber}}</ion-title>
            </ion-navbar>
        </ion-header>

        <ion-content (swipe)="swipe($event)">
            <main-table-item
                    [file]="file"
                    [canNavigateToDetails]="false">
            </main-table-item>
            <packages-top-view *ngIf="fileDetails"
                               [goods]="fileDetails.packages1.results[0].GoodsDesc"
                               [packages]="fileDetails.packages1.results[0].PackageType"
                               [volume]="fileDetails.packages1.results[0].Volume"
                               [weight]="fileDetails.packages1.results[0].Weight">
            </packages-top-view>
<!-- *ngIf="fileDetails && file"-->
            <tabs *ngIf="fileDetails">
                <tab [title]="'General'" [isActive]="true"
                     *ngIf="fileDetails.general && fileDetails.general.length > 0">
                    <general-tab [general]="fileDetails.general.results[0]"
                                 [transportType]="file.TransportType"></general-tab>
                </tab>
                <tab [title]="'Cargo'" *ngIf="fileDetails.cargo && fileDetails.cargo.length > 0">
                    <cargo-tab [cargo]="fileDetails.cargo.results[0]"></cargo-tab>
                </tab>
                <tab [title]="'Path'" *ngIf="fileDetails.path && fileDetails.path.length > 0">
                    <path-tab [path]="fileDetails.path.results[0]" [file]="file"></path-tab>
                </tab>
                <tab [title]="'Packages'"
                     *ngIf="fileDetails.packages1 && fileDetails.packages1.length > 0 && fileDetails.packages2 && fileDetails.packages2.length > 0">
                    <packages-tab [package1]="fileDetails.packages1.results[0]"
                                  [package2]="fileDetails.packages2.results[0]" [file]="file"></packages-tab>
                </tab>
                <tab [title]="'Events'" *ngIf="fileDetails.events && fileDetails.events.length > 0">
                    <events-tab [events]="fileDetails.events.results"></events-tab>
                </tab>
                <tab [title]="'Billing'" *ngIf="fileDetails.invoices && fileDetails.invoices.length > 0">
                    <billing-tab [bills]="fileDetails.invoices.results"></billing-tab>
                </tab>
                <tab [title]="'Documents'" *ngIf="fileDetails.inbox && fileDetails.inbox.length > 0">
                    <documents-tab [documents]="fileDetails.inbox.results"></documents-tab>
                </tab>
                <tab [title]="'Archive'" *ngIf="fileDetails.archDocs && fileDetails.archDocs.length > 0">
                    <arcDocs-tab [arcDocs]="fileDetails.archDocs.results"></arcDocs-tab>
                </tab>
            </tabs>
        </ion-content>
`})
export class FileDetailsComponent {

    file            : FileModel;
    fileDetails     : FileDetailsResponse;
    fileSearchType  : string;//the main search chose (Export/Import/Customs..)
    index           : number;

    constructor(private serverService: ServerService,
                private navParams: NavParams,
                public loadingSrvc: LoadingService) {

        this.file = navParams.get('file');
        this.fileSearchType = this.getFileSearchType();
        this.getFileDetails();
    }

    swipe(event) {
        console.log("swipe event captured");
        if (event.direction == 2) {
            if (this.index > 0) {
                this.index--;
            }
        } else if (event.direction == 4) {
            if (this.index < 7) {
                this.index++;
            }
        }
    }

    getFileDetails() {
        this.loadingSrvc.loading(true);
        this.serverService.mainSearchParams.fileNum = (this.file.FileNumber || this.file.OrderNumber) + '';

        let sub  = this.serverService
            .getFileDetails()
            .subscribe((fileDetails: FileDetailsResponse) => {
                this.fileDetails = fileDetails;
                //Reset the fileNum
                this.serverService.mainSearchParams.fileNum = '';
                this.loadingSrvc.loading(false);
                sub.unsubscribe();
            });
    }

    getFileSearchType(): string {
        let fileType: number = +this.serverService.mainSearchParams.fileType;
        let treatmentType: number = +this.serverService.mainSearchParams.treatmentType;

        for (let i = 0; i < FILE_TYPE.length; i++) {
            if (fileType == FILE_TYPE[i] && treatmentType == TREATMENT_TYPE[i])
                return SEARCH_STATES_NAMES[i];
        }
        return '';
    }
}
