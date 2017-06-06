/**
 * Created by Eyal on 26/05/2017.
 */
import {NgModule} from "@angular/core";

import {FavoritesService} from "./favorites.service";
import {LocalStorageService} from "./localStorage.service";
import {ServerService} from "./server.service";
import {CompaniesServiceService} from "./companiesState.service";
import {FilesService} from "./files.service";
import {LoadingService} from "./loading";

@NgModule({
    providers   :[
        LoadingService,
        FilesService,
        CompaniesServiceService,
        ServerService,
        LocalStorageService,
        FavoritesService
    ]
})
export class CoreServicesModule{}