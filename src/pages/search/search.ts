import {Component, ViewChild} from "@angular/core";
import {ViewController} from "ionic-angular";
import {FormControl, FormGroup} from "@angular/forms";
import {DAYS_STATES, FILE_STATES, TRANSPORT_STATES} from "../../consts";
import {PortsResponse} from "../../server/server-models/responses";
import {ServerService} from "../../services/server.service";
import {MainSearch} from "../../server/server-models/main-search-model";
import {DatePickerComponent} from "ng2-datepicker/lib-dist/ng2-datepicker.component";
import {DateModel} from "ng2-datepicker";
import * as moment from "moment";

@Component({
    styles: [`
        .searchRow {
            border-bottom: solid 0.1em #d3d4d6;
            /*padding: 5%;*/
            position: relative;
            height: 50px;
        }

        .searchRow ion-col {
            padding-left: 5%;
        }

        .searchColSeperator {
            width: 1px;
            height: 70%;
            background-color: #d3d4d6;
            position: absolute;
            left: 50%;
            margin-top: 4%;
        }

        ion-select {
            max-width: 100% !important;
            padding-left: 3.1%;
        }

        .fileStateCKB {
            margin-top: 2%;
        }

        ion-checkbox {
            margin-top: 2%;
        }

        .fileStateSpan {
            position: relative;
            bottom: 10%;
            margin-left: 5%;
        }
        /*ion-datetime{*/
        /*padding-left: 6%;*/
        /*}*/

        .search-top-buttons {
            height: 3em;
            display: flex;
            margin: 0.7em;
        }

        .search-top-buttons .button {
            width: 33%;
            font-size: 105%;
            /*margin-right: 1%;*/
            color: #8a8b8d;
            border: #d3d4d6 solid 1px;
            background-color: transparent;
        }

        .search-top-buttons .button.active {
            /*color: black;*/
            /*background-color: #ff870d;*/
            /*font-size: 105%;*/
            color: #ff870d;
            background-color: #323a45;
        }

        .searchBtnRow {
            margin-top: 10%;
        }

        .searchBtn{
            color: #1ebba6;
            background-color: #323a45;
            box-shadow: 0px 2px 5px #888888;
            text-align: center;
            padding: 5%;
            margin: 2% 10% 10%;
        }
    `],
    template: `
    <ion-list>
        <ion-list-header>
            <ion-icon name="close" (click)="closePopover()" style="font-size: 30px; float: right; margin-right: 5%;"></ion-icon>
        </ion-list-header>      

        <ion-grid [formGroup]="searchForm">
            <ion-row class="search-top-buttons">
                <!--<div class="search-top-buttons">-->
                    <button class="button" [ngClass]="{active:curDayState == daysStates.D7}" (click)="setDayState(daysStates.D7)">Last
                        Week
                    </button>
                    <button class="button" [ngClass]="{active:curDayState == daysStates.MONTH}" (click)="setDayState(daysStates.MONTH)">
                        Last Month
                    </button>
                    <button class="button" [ngClass]="{active:curDayState == daysStates.AllTimes}"
                            (click)="setDayState(daysStates.AllTimes)">All Dates
                    </button>
                <!--</div>-->
            </ion-row>
            <ion-row class="searchRow">
                <ion-col width-50 style="position: relative;">
                    <!--<ion-input type="text" placeholder="From Date"></ion-input>-->
                    <!--<ion-datetime (ionChange)="dateChangeFromPicker($event); setFocusToDate()" displayFormat="DD/MM/YYYY" formControlName="fromDate" class="fromDate"></ion-datetime>-->
                    <ng2-datepicker #fromDate (outputFormatedDate)="dateChangeFromPicker($event,true);"
                                    [options]="{firstWeekdaySunday:true,format:'DD/MM/YYYY'}"
                                    class="fromDate" style="position: absolute;bottom: 30%;width: 100%;"></ng2-datepicker>
                </ion-col>
                <div class="searchColSeperator"></div>
                <ion-col width-50>
                    <!--<ion-input type="text"></ion-input>-->
                    <!--formControlName="toDate" placeholder="To Date"></ion-input>-->

                    <ng2-datepicker
                            #toDate
                            (outputFormatedDate)="dateChangeFromPicker($event,false)"
                            [options]="{firstWeekdaySunday:true,format:'DD/MM/YYYY'}"
                            class="toDate"
                            style="position: absolute;bottom: 30%;width: 100%;">
                    </ng2-datepicker>

                    <!--<ion-datetime #toDate (ionChange)="dateChangeFromPicker($event)" displayFormat="DD/MM/YYYY" formControlName="toDate" class="toDate"></ion-datetime>-->
                </ion-col>
            </ion-row>
            <ion-row class="searchRow">
                <ion-col width-100>
                    <!--<ion-input type="text"-->
                    <!--formControlName="port" placeholder="Port of Discharge"></ion-input>-->
                    <!--<ion-item>-->
                    <ion-select placeholder="Port of Discharge" formControlName="port" *ngIf="ports && ports.length > 0">
                        <ion-option *ngFor="let port of ports.results;let i=index" [value]="port.portCode"><span *ngIf="i!=0">({{port.portCode}}) </span>{{port.portName}}
                        </ion-option>
                    </ion-select>
                    <!--</ion-item>-->
                </ion-col>
            </ion-row>
            <ion-row class="searchRow">
                <ion-col width-50>
                    <ion-input type="text"
                               formControlName="fileNum" placeholder="File"></ion-input>
                </ion-col>
                <div class="searchColSeperator"></div>
                <ion-col width-50>

                    <ion-input type="text"
                               formControlName="invoiceNum" placeholder="Invoice No."></ion-input>
                </ion-col>
            </ion-row>
            <ion-row class="searchRow">
                <ion-col width-50>
                    <ion-input type="text"
                               formControlName="orderNum" placeholder="Order No."></ion-input>
                </ion-col>
                <div class="searchColSeperator"></div>
                <ion-col width-50>
                    <!--<ion-input type="text"-->
                    <!--formControlName="transport" placeholder="Transport Type"></ion-input>-->
                    <ion-select placeholder="Transport Type" formControlName="transport">
                        <ion-option *ngFor="let transport of transportStates" [value]="transport.code">{{transport.type}}
                        </ion-option>
                    </ion-select>
                </ion-col>
            </ion-row>
            <ion-row class="searchRow">
                <ion-col width-50>

                    <ion-input type="text"
                               formControlName="mblMawb" placeholder="MAWB/MBL"></ion-input>
                </ion-col>
                <div class="searchColSeperator"></div>
                <ion-col width-50>

                    <ion-input type="text"
                               formControlName="hblHawb" placeholder="HAWB/HBL"></ion-input>
                </ion-col>
            </ion-row>
            <ion-row class="fileStateCKB">
                <ion-col style="padding-left: 4.5%;">
                    <ion-checkbox [(ngModel)]="fileState" [ngModelOptions]="{standalone: true}"></ion-checkbox>
                    <!--<input type="checkbox" [(ngModel)]="fileState"/>-->
                    <span class="fileStateSpan"> Show open files only</span>
                </ion-col>

            </ion-row>

            <ion-row class="searchBtnRow">
                <ion-col>
                    <div class="searchBtn" (click)="search()">FIND IT FOR ME</div>
                </ion-col>
            </ion-row>

        </ion-grid>

    </ion-list>
`})
export class SearchComponent {
    @ViewChild('toDate') toDatePicker: DatePickerComponent;
    @ViewChild('fromDate') fromDatePicker: DatePickerComponent;

    transportStates = TRANSPORT_STATES;
    daysStates = DAYS_STATES;
    curDayState: DAYS_STATES = DAYS_STATES.AllTimes;

    ports: PortsResponse;

    searchForm: FormGroup = new FormGroup({
        fileNum: new FormControl(''),
        orderNum: new FormControl(''),
        invoiceNum: new FormControl(''),
        fileState: new FormControl(FILE_STATES.OPEN),//default state is OPEN
        port: new FormControl(''),
        fromDate: new FormControl(''),
        toDate: new FormControl(''),
        transport: new FormControl(''),// '' - means ALL (air and sea)
        hblHawb: new FormControl(''),
        mblMawb: new FormControl(''),
    });

    constructor(public viewCtrl: ViewController, private serverService: ServerService) {
    }

    ngOnInit() {
        this.serverService.getPorts().subscribe((ports: PortsResponse) => {
            this.ports = ports;
        });
        this.restoreSearchParamsFromServer();
        this.searchForm.valueChanges.subscribe(params => {
            console.log(params);
        })

    }

    closePopover() {
        this.viewCtrl.dismiss();
    }

    set fileState(onlyOpen: boolean) {
        if (onlyOpen)
            this.searchForm.controls['fileState'].setValue(FILE_STATES.OPEN);
        else
        // this.searchForm.controls['fileState'].setValue(FILE_STATES.ALL);
            this.searchForm.controls['fileState'].setValue('');
    }

    get fileState(): boolean {
        return this.searchForm.value['fileState'] == '' + FILE_STATES.OPEN;
    }

    setDayState(dayState: DAYS_STATES) {
        // if(this.curDayState == dayState) {
        //   this.curDayState = null;
        // }
        // else {
        this.curDayState = dayState;
        // }
        this.calculateDates()
    }

    calculateDates() {
        if (this.curDayState == DAYS_STATES.AllTimes) {
            this.toDatePicker.clear();
            this.fromDatePicker.clear();
            this.searchForm.controls['fromDate'].setValue('');
            this.searchForm.controls['toDate'].setValue('');
        } else {
            let curDate = new Date();

            // this.searchForm.controls['toDate'].setValue(curDate.toLocaleDateString('en-GB'));
            // curDate.setDate(curDate.getDate() - this.curDayState);
            // this.searchForm.controls['fromDate'].setValue(curDate.toLocaleDateString('en-GB'));

            this.searchForm.controls['toDate'].setValue(curDate.toJSON());
            // TODO:eyal
            this.toDatePicker.currentDate  = moment().local();
            // this.toDatePicker.date = {day: curDate.getDay(), month: curDate.getMonth(),year:curDate.getFullYear()};
            if (this.curDayState == DAYS_STATES.MONTH)
                curDate.setMonth(curDate.getMonth() - 1);
            else{
                curDate.setDate(curDate.getDate() - this.curDayState);
            }


            this.searchForm.controls['fromDate'].setValue(curDate.toJSON());
            //this.fromDatePicker.setDate(curDate);
            this.toDatePicker.currentDate  = moment().local();
        }
    }

    dateChangeFromPicker(date: Date, isFromDate: boolean) {
        setTimeout(() => {
            this.toDatePicker.close();
            this.fromDatePicker.close();
        }, 300);

        this.curDayState = null;
        if (isFromDate) {
            this.searchForm.controls['fromDate'].setValue(date.toJSON());
            this.setFocusToDate();
        }else{
            this.searchForm.controls['toDate'].setValue(date.toJSON());
        }
    }

    setFocusToDate() {
        setTimeout(() => {
            this.toDatePicker.open();
        }, 300);
    }

    search() {
        let searchObj = Object.assign({}, this.searchForm.value);
        this.serverService.updateSearchParams(searchObj);
        this.closePopover();
    }

    restoreSearchParamsFromServer() {
        let params: MainSearch = this.serverService.mainSearchParams;
        for (let key in this.searchForm.controls) {
            this.searchForm.controls[key].setValue(params[key]);
        }

        if (params.fromDate != '' || params.toDate != '') {
            this.curDayState = null;
            if(params.fromDate !=''){
                this.fromDatePicker.currentDate = moment(params.fromDate);
            }
            if(params.toDate !=''){
                this.toDatePicker.currentDate = moment(params.toDate);
            }
        }
    }
}
