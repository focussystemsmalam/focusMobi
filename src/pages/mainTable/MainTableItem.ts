/**
 * Created by eshel on 17/12/2016.
 */
import {Component, Input, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {FileDetailsComponent} from "../fileDetails/fileDetails";
import {FavoriteFile, FileModel} from "../../server/server-models/file-model";
import {FavoritesService} from "../../services/favorites.service";
import {ServerService} from "../../services/server.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'main-table-item',
    styles: [`

        .file-row {
            position: relative;
            display: flex;
            /*padding: 1% 0;*/
        }

        .location {
            margin-left: 2%;
            min-width: 33%;
            width: 33%;
        }

        .location:before {
            content: '';
            display: block;
            position: absolute;
            height: 100%;
            width: 0.06667em;
            background-color: #ececec;
            left: 32%;
            top: 8%;
        }

        .location .text {
            width: 85%;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .transport-icon {
            margin-left: 3%;
            width: 35%;
        }

        .boat-icon {
            content: url("assets/icons/ship_blue.svg");
        }

        .plain-icon {
            content: url("assets/icons/airplane_green.svg");
        }

        .file-row .right-details {
            position: absolute;
            left: 35%;
            width: 67%;
        }

        .icon {
            position: absolute;
            right: 4%;
            top: 17%;
            width: 6%;
        }

        .icon.full-star {
            content: url("assets/icons/star(1).svg");
        }

        .icon.empty-star {
            content: url("assets/icons/star-1.svg");
        }

        .file-row .right-details .large-title {
            max-width: 57%;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 400;
            /*margin-top: 1%;*/
        }

        .file-row .right-details .small-title {
        }

        .file-row .right-details .right-details-bottom {
            /*position: absolute;*/
            display: flex;
            margin-top: 6%;
        }

        .file-row .right-details .right-details-bottom .date {
        }

        .file-row .right-details .right-details-bottom .file-state {
            margin-left: 7%;
            /*overflow: hidden;*/
            /*text-overflow: ellipsis;*/
        }

        .eyal {
            border: 1px solid black;
        }

    `],
    template: `
        <ion-item>
            <div class="file-row" (click)="onItemClick()">
                <div class="location">
                    <div class="text condensed-font-400">{{file.LocalPort || '&nbsp;'}}</div>
                    <div class="transport-icon" [ngClass]="iconClass()"></div>
                    <div class="text condensed-font-400">{{file.ForeignPort || '&nbsp;'}}</div>
                </div>
                <div class="right-details">
                    <div class="large-title">{{file.Carrier || '&nbsp;'}}</div>
                    <div class="small-title">{{file.FileNumber}}</div>
                    <div class="right-details-bottom">
                    <div class="date">{{file.OpenDate}}</div>
                    <div class="file-state">{{file.Status}}</div>
                    </div>
                </div>
            </div>
            <div class="icon" (click)="starClicked($event)"
                 [ngClass]="{'full-star':isFavorite,'empty-star':!isFavorite}">                
            </div>
        </ion-item>
    `
})
export class MainTableItemComponent implements OnInit {

    @Input() file: FileModel;
    @Input() canNavigateToDetails: boolean = true;

    _isFavorite: boolean;

    subscription: Subscription;

    constructor(private navCtrl: NavController, private serverService: ServerService, private favoritesService: FavoritesService) {//, private favoritesService:FavoritesService) {
    }

    ngOnInit() {
        this.isFavorite = this.favoritesService.isFavorite(this.file);
        this.subscription = this.favoritesService.listenToChange(this.file).subscribe(() => {
            this.isFavorite = this.favoritesService.isFavorite(this.file);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    set isFavorite(bool: boolean) {
        this._isFavorite = bool;
        // console.log("Setted To: "+ bool);
    }

    get isFavorite(): boolean {
        return this._isFavorite;
    }

    onItemClick() {
        if (this.canNavigateToDetails)
            this.navCtrl.push(FileDetailsComponent, {
                file: this.file
            });
    }

    iconClass(): any {
        return {
            'boat-icon': this.file.TransportType == 'Sea',
            'plain-icon': this.file.TransportType == 'Air',
        }
    }

    starClicked(ev) {
        // console.log("Prev:" + this.isFavorite);
        ev.stopPropagation();
        let favF: FavoriteFile = {
            fileType: this.serverService.mainSearchParams.fileType,
            FileNumber: this.file.FileNumber
        };
        if (this.isFavorite) {
            this.favoritesService.removeFromFavorites(favF);
        }
        else {
            this.favoritesService.addToFavorits(favF);
        }
        // this.isFavorite = !this.isFavorite;
    }

}
