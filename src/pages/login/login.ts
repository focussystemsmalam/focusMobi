/**
 * Created by Guy on 30/09/2016.
 */
import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Companies, LogInResponse, ServerUrlResponse} from "../../server/server-models/responses";
import {ServerService} from "../../services/server.service";
import {LocalStorageService} from "../../services/localStorage.service";
import {NavController} from "ionic-angular";
import {Page1} from "../page1/page1";
import {LoadingService} from "../../services/loading";
import {CompaniesServiceService} from "../../services/companiesState.service";

@Component({
  selector: 'login',
  styles: [`/*.profile-img-card {*/
/*width: 96px;*/
/*height: 96px;*/
/*margin: 20px auto 0;*/
/*display: block;*/
/*-moz-border-radius: 50%;*/
/*-webkit-border-radius: 50%;*/
/*border-radius: 50%;*/
/*content: url("assets/icons/people.svg");*/
/*}*/
.form-signin {
  position: absolute;
  left: 0;
  right: 0;
  padding: 5%;
  margin: auto;
  width: 70%;
  /*margin-top: 40%;*/
  background-color: white;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

ion-content {
  background-image: url("assets/images/background.png");
  background-size: cover;
}

ion-label {
  color: #1EBBA6 !important;
}

button {
  color: white;
  background-color: #242A34;
  padding: 5% 0;
  font-size: 110%;
  margin-top: 15%;
}
button[disabled]{
    cursor: default;
    opacity: .4;
    pointer-events: none;
    background-color: transparent;
    border: 1px solid black;
    color: black;
}
ion-img{
    width: 65%;
    margin: auto;
}
/*ion-card{*/
/*margin-top: 20%;*/
/*}*/
`],
  template: `<ion-content class="login-backgroung" *ngIf="companies">
  <!--<img class="profile-img-card"/>-->
  <!--<ion-card-content>-->
  <!--<ion-card-title>-->
  <!--Title Title-->
  <!--</ion-card-title>-->

  <form [formGroup]="signInForm" class="form-signin">
    <img src="assets/images/focus.png"/>
    <!--<ion-list>&lt;!&ndash;inset&ndash;&gt;-->
      <!--<span id="reauth-email" class="reauth-email"></span>-->
      <!--<input id="userName" type="text" class="form-control" placeholder="Username" autofocus formControlName="userName">-->
      <ion-item class="login-label-item underline">
        <ion-label floating>Username</ion-label>
        <ion-input id="userName" type="text" autofocus autocorrect="off" autocapitalize="off"
                   formControlName="userName"></ion-input>
      </ion-item>
      <!--<input id="password" type="password" class="form-control" placeholder="Password" formControlName="password">-->
      <ion-item class="login-label-item underline">
        <ion-label floating>Password</ion-label>
        <ion-input id="password" type="password"
                   formControlName="password"></ion-input>
      </ion-item>
      <ion-item class="login-label-item underline" style="margin-top: 9%">
        <ion-label>Company</ion-label>
        <ion-select formControlName="companyID">
          <ion-option *ngFor="let comp of companies.companies" [value]="comp.companyID">{{comp.comanyName}}
          </ion-option>
        </ion-select>
      </ion-item>
      <!--<auto-complete-dropdown [array]="companies.companies" [keyPropName]="'companyID'" [valuePropName]="'comanyName'" [placeHolder]="'Company ID'" [controlName]="'companyID'" [form]="signInForm"></auto-complete-dropdown>-->

      <ion-item class="login-label-item no-underline">
        <ion-label>Remember Me</ion-label>
        <ion-checkbox [(ngModel)]="rememberMe" [ngModelOptions]="{standalone: true}"></ion-checkbox>
      </ion-item>
      <div>
        <button ion-button block [class.disabled]="!signInForm.valid" [disabled]="!signInForm.valid"
                (click)="signIn()">Sign in
        </button>
      </div>

    <!--</ion-list>-->
    <div *ngIf="wrongDetails" class="loginErrMsg">Wrong details..</div>

  </form><!-- /form -->
  <!--</ion-card-content>-->
</ion-content>
`
})
export class LoginComponent implements OnInit {
  companies: Companies;
  wrongDetails: boolean = false;

  signInForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    companyID: new FormControl('', [Validators.required]),
  });

  isSwitchComp:boolean;

  constructor(public navCtrl: NavController,
              private serverService: ServerService,
              private localStorageService: LocalStorageService,
              private companiesStateSrvc:CompaniesServiceService,
              public loadingSrvc: LoadingService) {
  }

  set rememberMe(val: boolean) {
    this.localStorageService.rememberMe = val
  }

  get rememberMe() {
    return this.localStorageService.rememberMe;
  }

  ngOnInit() {
    this.isSwitchComp = this.companiesStateSrvc.isSwitchComp;
    this.companiesStateSrvc.isSwitchComp = false;

    if (this.localStorageService.rememberMe == true) {
      this.signInForm.controls['userName'].setValue(this.localStorageService.username);
      this.signInForm.controls['password'].setValue(this.localStorageService.password);
      this.signInForm.controls['companyID'].setValue(this.localStorageService.companyId);
    }


    this.serverService.getCompanies().subscribe((companies: Companies) => {
      this.companies = companies;
      if(this.isSwitchComp) {
        let dictComps = this.localStorageService.getAlCompanies();
        if (dictComps) {
          let compIds = [];
          for(let compId in dictComps)
            compIds.push(compId);
          this.companies.companies = this.companies.companies.filter(comp=>{return compIds.indexOf(comp.companyID)>-1});
        }
      }
    },
      (err)=>{
          alert('No internet connection');
      });


    this.signInForm.valueChanges.subscribe((params) => {
      this.wrongDetails = false;
    });

    this.signInForm.controls['companyID'].valueChanges.subscribe(compId => {
      let obj: {userName: string,password: string} = this.localStorageService.getUsernamePasswordToCompanyId(compId);
      if (obj) {
        this.signInForm.controls['userName'].setValue(obj.userName);
        this.signInForm.controls['password'].setValue(obj.password);
      }
      // else{
      //   this.signInForm.controls['userName'].setValue('');
      //   this.signInForm.controls['password'].setValue('');
      // }
    });
  }

  signIn() {
    // checking for back button compatability
    //this.loadingSrvc.loading(true);
    if (this.rememberMe) {
      this.localStorageService.storeUsernamePasswordToCompanyId(this.signInForm.value['userName'], this.signInForm.value['password'], this.signInForm.value['companyID'])
      this.localStorageService.username = this.signInForm.value['userName'];
      this.localStorageService.password = this.signInForm.value['password'];
      this.localStorageService.companyId = this.signInForm.value['companyID'];
    } else {
      this.localStorageService.removeUsernamePasswordToCompanyId(this.signInForm.value['companyID']);
      this.localStorageService.username = '';
      this.localStorageService.password = '';
      this.localStorageService.companyId = '';
    }
    this.setCompName();
    this.getServerUrl();
  }

  getServerUrl() {
    let json = JSON.parse("{}");
    json['companyID'] = this.signInForm.value['companyID'];

    let sub = this.serverService.getServerURL(json).subscribe((res: ServerUrlResponse) => {
      if (res && res.url) {
        this.login();
      }
      else {
        this.wrongDetails = true;
        this.loadingSrvc.loading(false);
      }
    });
    this.loadingSrvc.loading(true, sub);
  };

  login() {
    let json = JSON.parse(JSON.stringify(this.signInForm.value));
    delete json['companyID'];

    let sub = this.serverService.logIn(json).subscribe((loginRes: LogInResponse) => {
      if (loginRes) {
        if (loginRes.UserName) {
          this.loadingSrvc.loading(false);
          this.navCtrl.setRoot(Page1);
        } else {
          this.wrongDetails = true;
        }
      }
      this.loadingSrvc.loading(false);
    });
  }

  setCompName(){
    let comp = this.companies.companies.find(comp=>{return comp.companyID == this.signInForm.value['companyID']});
    if(comp){
      this.serverService.companyName = comp.comanyName;
    }
  }
}
