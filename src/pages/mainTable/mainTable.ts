/**
 * Created by eshel on 17/12/2016.
 */
import {Component, Input} from "@angular/core";
import {FileModel} from "../../server/server-models/file-model";
import {ServerService} from "../../services/server.service";
import {FavoritesService} from "../../services/favorites.service";

@Component({
    selector: 'mainTable',
    template: `
        <ion-list>
            <main-table-item *ngFor="let file of files" [file]="file"></main-table-item>
        </ion-list>
    `
})
export class MainTableComponent {

    _files: FileModel[];

    constructor(
        private serverService: ServerService,
        private favoritesService: FavoritesService
    ) {}

    @Input()
    set files(files: FileModel[]) {
        this._files = files;
        this.favoritesToTop();
    }

    get files(): FileModel[] {
        return this._files;
    }

    favoritesToTop() {
        let minIndexToCheck: number = 0;
        for (let i = this._files.length - 1; i >= minIndexToCheck; i--) {
            if (this.favoritesService.isFavorite(this._files[i])) {
                let f = this._files[i];
                this._files.splice(i, 1);
                this._files.unshift(f);
                i++;
                minIndexToCheck++;
            }
        }
    }
}
