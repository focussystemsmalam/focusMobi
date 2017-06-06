import {Injectable} from "@angular/core";
import {FavoriteFile} from "../server/server-models/file-model";
import {MAX_FAVORIT_FILES} from "../consts";

@Injectable()
export class LocalStorageService {


    set rememberMe(val: boolean) {
        localStorage.setItem('rememberMe', JSON.stringify(val));
    }

    get rememberMe(): boolean {
        return JSON.parse(localStorage.getItem('rememberMe'));
    }

    set username(username: string) {
        localStorage.setItem('username', username);
    }

    get username() {
        return localStorage.getItem('username');
    }

    set password(password: string) {
        localStorage.setItem('password', password);
    }

    get password() {
        return localStorage.getItem('password');
    }

    set companyId(companyId: string) {
        localStorage.setItem('companyId', companyId);
    }

    get companyId() {
        return localStorage.getItem('companyId');
    }

    // set serverUrl(serverUrl: string) {
    //   localStorage.setItem('serverUrl', serverUrl);
    // }
    //
    // get serverUrl() {
    //   return localStorage.getItem('serverUrl');
    // }

    set logo(logo: string) {
        localStorage.setItem('logo', logo);
    }

    get logo() {
        return localStorage.getItem('logo');
    }

    addFavoriteFile(file: FavoriteFile) {
        let favArray: FavoriteFile[];
        let fav = localStorage.getItem('favorites');

        if (fav)
            favArray = JSON.parse(fav);
        else
            favArray = [];

        favArray.push(file);
        if (favArray.length > MAX_FAVORIT_FILES)
            favArray.shift();
        localStorage.setItem('favorites', JSON.stringify(favArray));
    }

    removeFavoriteFile(file: FavoriteFile) {
        let favArray: FavoriteFile[];
        let fav = localStorage.getItem('favorites');

        if (fav)
            favArray = JSON.parse(fav);
        else
            favArray = [];

        let indexOfFile: number = favArray.findIndex(favF => {
            return favF.fileType == file.fileType && favF.FileNumber == file.FileNumber
        });
        if (indexOfFile > -1) {
            favArray.splice(indexOfFile, 1);
            localStorage.setItem('favorites', JSON.stringify(favArray));
        }
    }

    getAllFavoritesFiles(): FavoriteFile[] {
        let f = localStorage.getItem('favorites');
        return JSON.parse(f);
    }

    storeUsernamePasswordToCompanyId(username: string, password: string, companyID: string) {
        let comps = JSON.parse(localStorage.getItem('companies'));
        if (!comps) {
            comps = {};
        }
        comps[companyID] = {userName: username, password: password};
        localStorage.setItem('companies', JSON.stringify(comps));

        // let obj:string = JSON.stringify({userName:username,password:password});
        // localStorage.setItem('comp' + companyID,obj);
    }

    getUsernamePasswordToCompanyId(companyID: string): { userName: string, password: string } {
        let comps = JSON.parse(localStorage.getItem('companies'));
        if (!comps || !comps[companyID]) {
            return null;
        }

        return comps[companyID];

        // let obj:{userName:string,password:string} = JSON.parse(localStorage.getItem('comp' + companyID));
        // return obj;
    }

    removeUsernamePasswordToCompanyId(companyID: string) {
        let comps = JSON.parse(localStorage.getItem('companies'));
        if (!comps) {
            return;
        }
        delete comps[companyID];
        localStorage.setItem('companies', JSON.stringify(comps));
        // localStorage.setItem('comp' + companyID,null);
    }

    getAlCompanies(): { [key: string]: { userName: string, password: string } } {
        let comps = JSON.parse(localStorage.getItem('companies'));
        return comps;
    }

    clearStorage() {
        localStorage.clear();
    }
}
