import {EventEmitter, Injectable} from "@angular/core";
import {LocalStorageService} from "./localStorage.service";
import {ServerService} from "./server.service";
import {FavoriteFile, FileModel} from "../server/server-models/file-model";


@Injectable()
export class FavoritesService {

  favoriteFiles: FavoriteFile[];
  events:{[key:string]:EventEmitter<void>} = {};

  constructor(
      private localStorageService: LocalStorageService,
      private serverService: ServerService
  ) {
    this.favoriteFiles = this.localStorageService.getAllFavoritesFiles();
  }

  addToFavorits(file: FavoriteFile) {
    this.localStorageService.addFavoriteFile(file);
    this.favoriteFiles = this.localStorageService.getAllFavoritesFiles();
    this.outputEvent(file);
  }

  removeFromFavorites(file: FavoriteFile) {
    this.localStorageService.removeFavoriteFile(file);
    this.favoriteFiles = this.localStorageService.getAllFavoritesFiles();
    this.outputEvent(file);
  }

  isFavorite(file: FileModel): boolean {
    let fileType = this.serverService.mainSearchParams.fileType;
    if (this.favoriteFiles) {
      if (this.favoriteFiles.find(favF => {
          return favF.FileNumber == file.FileNumber && favF.fileType == fileType;
        }))
        return true;
    }
    return false;
  }

  listenToChange(file:FileModel):EventEmitter<void>{
    let fileType = this.serverService.mainSearchParams.fileType;
    if(!this.events[file.FileNumber+','+fileType]) {
      this.events[file.FileNumber + ',' + fileType] = new EventEmitter<void>();
    }
    return this.events[file.FileNumber+','+fileType];
  }

  outputEvent(file:FavoriteFile){
    if(this.events[file.FileNumber+','+file.fileType])
      this.events[file.FileNumber+','+file.fileType].emit();
  }
}
