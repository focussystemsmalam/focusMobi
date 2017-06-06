import {ErrorHandler, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";

import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {CloudModule, CloudSettings} from "@ionic/cloud-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {FileOpener} from "@ionic-native/file-opener";
import {Base64ToGallery} from "@ionic-native/base64-to-gallery";
import "./rxjs.operators";

import {PagesModule} from "../pages/pages.module";
import {CoreServicesModule} from "../services/core.services.module";
import {MyApp} from "./app.component";


const cloudSettings: CloudSettings = {
    'core': {
        'app_id': 'APP_ID'
    }
};

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp),
        CloudModule.forRoot(cloudSettings),
        // project modules
        PagesModule,
        CoreServicesModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        //MyApp
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        StatusBar,
        FileOpener,
        Base64ToGallery
    ]
})
export class AppModule {
}
