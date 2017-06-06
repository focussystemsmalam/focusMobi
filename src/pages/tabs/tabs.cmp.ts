import {Component, ContentChildren, QueryList} from "@angular/core";
import {Tab} from "./tab.cmp";


@Component({
    selector: 'tabs',
    styles: [`

        /* Tabs panel */
        .tabbable-panel {
            max-width: 100%;
            padding-top: 2%;
        }

        /* Default mode */
        .tabbable-line > ion-scroll .nav-tabs {
            border: none;
            margin: 0px;
            padding-left: 0;
            /*width: 130%;*/
            display: flex;
        }

        .tabbable-line > ion-scroll .nav-tabs:after {
            clear: both;
            display: table;
            content: ' ';
        }

        .tabbable-line > ion-scroll .nav-tabs > li {
            float: left;
            text-align: center;
            padding: 4% 1%;
            display: block;
            width: 25%;
            min-width: 100px;
            /*margin-right: 0.5%;*/
            margin-right: 0.3%;
            border-top-left-radius: 8px;
            background-color: #a7aaae;
            color: white;
        }

        .tabbable-line > ion-scroll .nav-tabs > li.active {
            color: black;
            position: relative;
            background-color: #d3d4d6;
        }

        .tabbable-line > ion-scroll .nav-tabs > li.active .marker {
            background-color: #06bebd;
        }

        .tabbable-line > ion-scroll .tab-content {
            margin-top: -3px;
            border: 0;
            padding: 15px 0;
        }

        .portlet .tabbable-line > ion-scroll .tab-content {
            padding-bottom: 0;
        }

        .marker {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 5px;
            right: 0.2%;
            background-color: transparent;
        }
    `],
    template: `
        <div class="tabbable-panel">
            <div class="tabbable-line">
                <!--<ion-scroll scrollX="true" class="wide-as-needed">-->
                <ion-scroll scrollX="true">
                    <div class="nav nav-tabs ">
                        <li [class.active]="tab.isActive"
                            (click)="setActive(tab)"
                            *ngFor="let tab of tabs">
                            <b>{{tab.title}}</b>
                            <div class="marker"></div>
                        </li>
                    </div>
                </ion-scroll>
                <div class="tab-content">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
`})
export class Tabs {
    @ContentChildren(Tab) tabs: QueryList<Tab>;

    setActive(tab: Tab) {
        this.tabs.forEach((t) => t.isActive = false);
        tab.isActive = true;
    }

    swipe(event) {
        console.log("swipe event captured");
        if (event.direction == 2) {
            console.log("swiping left");
        } else if (event.direction == 4) {
            console.log("swiping left");
        }
    }
}

