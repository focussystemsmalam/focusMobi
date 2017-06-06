import {Component, ViewChild} from "@angular/core";
import {AlertController, Nav, Platform} from "ionic-angular";

import {LoginComponent} from "../pages/login/login";
import {LocalStorageService} from "../services/localStorage.service";
import {ServerService} from "../services/server.service";
import {ExcelFileResponse} from "../server/server-models/responses";
import {LoadingService} from "../services/loading";
import {CompaniesServiceService} from "../services/companiesState.service";
import {StatusBar} from "@ionic-native/status-bar";
import {FileOpener} from "@ionic-native/file-opener";

@Component({
  styles:[`
button{
    color: white;
    background-color: transparent;
}
.icon{
  padding: 5%;
  width: 20%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.icon.export-icon{
  content: url("assets/icons/export0.svg");
  width: 17%;
}
.icon.switch-icon{
  content: url("assets/icons/menu_items0.svg");
  width: 17%;
}
.icon.logout-icon{
  content: url("assets/icons/logout_green.svg");
}
.icon.quit-icon{
  content: url("assets/icons/logout-orange0.svg");
}
.menu-text{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 30%;
}
span{
  padding: 3% 0;
}
`],
  template: `
<ion-menu [content]="content">
  <ion-header>
    <ion-toolbar>
      <ion-title>{{serverService.companyName}}</ion-title>
      <ion-icon name="close" menuClose style="position: absolute;right: 0;color: white;font-size: 30px;"></ion-icon>
    </ion-toolbar>
  </ion-header>

  <ion-content class="menu-content">
    <ion-list>
      <button class="menu-button" menuClose ion-item (click)="getExcel()">
        <span class="icon export-icon"></span><span class="menu-text">Export To Excel</span>
      </button>
      <button class="menu-button" menuClose ion-item (click)="switchComp()">
        <span class="icon switch-icon"></span><span class="menu-text">Switch Company</span>
      </button>
      <button class="menu-button" menuClose ion-item (click)="logOut()">
        <span class="icon logout-icon"></span><span class="menu-text">Log Out</span>
      </button>
      <button class="menu-button" menuClose ion-item (click)="quit()" HideWhen="ios">
        <span class="icon quit-icon"></span><span class="menu-text">Quit</span>
      </button>
    </ion-list>
  </ion-content>

</ion-menu>

<!-- Disable swipe-to-go-back because it's poor UX to combine STGB with side menus -->
<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>
`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = Page1;
  rootPage: any = LoginComponent;
  isSwitchComp;

  // pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              private localStorageService: LocalStorageService,
              private statusBar: StatusBar,
              private fileOpener:FileOpener,
              public serverService: ServerService,
              private companiesStateSrvc:CompaniesServiceService,
              private loadingSrvc: LoadingService,
              public  alertCtrl: AlertController) {
    this.initializeApp();
  }

  initializeApp() {
    /* remove from production ! */
    /* window['platform'] = this.platform; */
    /* remove from production ! */

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher
      // level native things you might need.
      this.statusBar.styleDefault();

      //window['test123']=this.platform;
      this.platform.registerBackButtonAction(()=>{

        if(this.loadingSrvc.IsLoading){
        if(this.loadingSrvc.Owner) {
          this.loadingSrvc.Owner.unsubscribe(); }
        this.loadingSrvc.loading(false); }
        else if(this.nav.canGoBack()) {
          this.nav.pop(); }
          else {
          /*this.divshow=true; */
          let confirm = this.alertCtrl.create({
            title: 'quit?',
            message: 'Do you want to exit?',
            buttons: [
              {
                text: 'No',
                handler: () => { }
              },
              {
                text: 'Yes',
                handler: () => { this.platform.exitApp(); }
              }
            ]
          });
          let dialogResult = confirm.present();
          }
      });
      //SplashScreen.hide();
    });
  }

  logOut() {
    // this.localStorageService.clearStorage();
    this.nav.setRoot(LoginComponent);
  }

  getExcel() {
    let sub=this.serverService.getExcelFile()
        .subscribe((excel: ExcelFileResponse) => {
              this.loadingSrvc.loading(false);
              sub.unsubscribe();
              if (excel && excel.file) {
                this.fileOpener
                    .openBase64(
                        'excel: ' + excel.inboxNumber,
                        excel.extension,
                        excel.file,
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        () => {}
                    );
              }else{
                this.loadingSrvc.toastMsg('File type not supported');
              }
        });
    this.loadingSrvc.loading(true,sub);
  }

  switchComp(){
    this.companiesStateSrvc.isSwitchComp = true;
    this.nav.setRoot(LoginComponent);
  }

  quit(){
    this.platform.exitApp();
  }
}
