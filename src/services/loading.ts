import {Injectable} from "@angular/core";
import {Loading, LoadingController} from "ionic-angular";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class LoadingService {

    loadingRef: Loading;
    private owner: Subscription;
    private isActive: boolean;

    get Owner() {
        return this.owner;
    }

    get IsLoading() {
        return this.isActive;
    }


    constructor(public loadingCtrl: LoadingController) {}

    //bool indicate if to show or dismiss the loading
    loading(bool: boolean, owner?: any) {
        if (bool) {
            this.isActive = true;
            if (owner) {
                this.owner = owner;
            }
            this.loadingRef = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            this.loadingRef.present();
        } else {
            this.isActive = false;
            if (this.loadingRef) {
                this.loadingRef.dismiss();
                this.loadingRef = null;
            }
        }
    }

    toastMsg(msg: string) {
        this.loadingRef = this.loadingCtrl.create({
            spinner: 'hide',
            content: msg,
            duration: 2500
        });
        this.loadingRef.present();
    }
}
