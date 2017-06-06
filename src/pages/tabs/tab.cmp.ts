/**
 * Created by Guy on 17/08/2016.
 */
import {Component, Input} from "@angular/core";

@Component({
    selector: 'tab',
    template: `
<div class="tab-pane active">
    <ng-content *ngIf="isActive"></ng-content>
</div>
`})
export class Tab {
    @Input()title:string;
    @Input()isActive:boolean;
}
