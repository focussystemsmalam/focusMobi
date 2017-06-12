import {Component, OnInit} from "@angular/core";
import {AppVersion} from "@ionic-native/app-version";
import {Platform, ViewController} from "ionic-angular";

@Component({
  selector: 'page-about',
  styles: [`
    ion-content {

    }
  `],
  template: `
    <ion-content has-bouncing="false" overflow-scroll="true">
      <div class="about-content">
        <h1>About</h1>
        <label>{{appName}}</label>
        <label>{{packageName}}</label>
        <label>{{versionNumber}}</label>
      </div>
    </ion-content>
  `
})
export class AboutPageComponent implements OnInit {

  appName: string = "Focus";
  versionNumber: string = "1.0.33";

  constructor(private platform: Platform, private appVersion: AppVersion, public viewCtrl: ViewController) {
  }

  ngOnInit(): void {
    if (this.platform.is("cordova")) {
      this.appVersion.getAppName().then(val => this.appName = val);
      this.appVersion.getVersionNumber().then(val => this.versionNumber = val);
    }
  }

  closeAbout() {
    this.viewCtrl.dismiss();
  }


}
