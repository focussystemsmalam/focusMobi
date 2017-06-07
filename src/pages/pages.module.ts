/**
 * Created by Eyal on 26/05/2017.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ArcDocTab} from "./fileDetails/detailsTabs/arcDocsTab";
import {SearchComponent} from "./search/search";
import {PathTab} from "./fileDetails/detailsTabs/pathTab";
import {PackagesTab} from "./fileDetails/detailsTabs/packagesTab";
import {GeneralTab} from "./fileDetails/detailsTabs/generalTab";
import {CargoTab} from "./fileDetails/detailsTabs/cargoTab";
import {BillingTab} from "./fileDetails/detailsTabs/billingTab";
import {DocumentsTab} from "./fileDetails/detailsTabs/documentsTab";
import {EventsTab} from "./fileDetails/detailsTabs/eventsTab";
import {PackagesTopView} from "./fileDetails/packagesTopView";
import {Tab} from "./tabs/tab.cmp";
import {Tabs} from "./tabs/tabs.cmp";
import {FileDetailsComponent} from "./fileDetails/fileDetails";
import {MainTableItemComponent} from "./mainTable/MainTableItem";
import {MainTableComponent} from "./mainTable/mainTable";
import {Page1} from "./page1/page1";
import {LoginComponent} from "./login/login";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "ionic-angular";
import {DatePickerModule} from "ng2-datepicker/lib-dist/ng2-datepicker.module";

let components = [
    LoginComponent,
    Page1,
    MainTableComponent,
    MainTableItemComponent,
    FileDetailsComponent,
    PackagesTopView,
    SearchComponent,

    Tabs,
    Tab,
    EventsTab,
    DocumentsTab,
    BillingTab,
    CargoTab,
    GeneralTab,
    PackagesTab,
    PathTab,
    ArcDocTab
];

@NgModule({
    declarations:[
        ...components
    ],
    providers   :[],
    bootstrap   :[],
    imports     :[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DatePickerModule,
        IonicModule
    ],
    exports     :[...components],
    entryComponents: [
        LoginComponent,
        Page1,
        FileDetailsComponent,
        SearchComponent
    ]
})
export class PagesModule{}
