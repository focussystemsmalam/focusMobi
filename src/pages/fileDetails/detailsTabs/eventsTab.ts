/**
 * Created by eshel on 01/01/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {EventsObj} from "../../../server/server-models/responses";

@Component({
  selector: 'events-tab',
  styles: [`
.event-item {
    display: flex;
    align-items: center;
}

.event-item .alien-icon {
    content: url("assets/icons/system_avatar.svg");
}

.event-item .man-icon {
    content: url("assets/icons/people.svg");
}

.event-item .initiator-icon {
    position: relative;
    width: 13%;
    margin-right: 7%;
    margin-left: 3%;
}

.event-item .date-time{
    position: absolute;
    left: 53%;
}

.event-item .date-time span{
  padding: 2%;
}

.event-item .mid-text .bottom-title {
  font-weight: 400;
}

.top-title{
  line-height: 1.5;
}
`],
  template: `
<ion-list>
  <button ion-item *ngFor="let event of events" style="padding-left: 0">
    <div class="event-item">
      <div class="initiator-icon" [ngClass]="initiatorIcon(event)"></div>
      <div class="mid-text">
          <div class="top-title">{{event.Initiator}}</div>
          <div class="bottom-title">{{event.Description}}</div>
      </div>
      <div class="date-time">
          <span class="date">{{event.Date}}</span>
          <span class="time">{{event.Time}}</span>
          <div>&nbsp;</div>
      </div>
    </div>
  </button>
</ion-list>
`})
export class EventsTab{

  @Input() events: EventsObj[];

  initiatorIcon(event:EventsObj):any{
    return {
      'alien-icon':event.Initiator == 'Batch',
      'man-icon'  :event.Initiator != 'Batch'
    }
  }
}
