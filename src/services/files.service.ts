import {Injectable} from "@angular/core";
import {FileOpener} from "@ionic-native/file-opener";
import {IFile} from "../server/server-models/file-model";
import {File} from "@ionic-native/file";
import {Platform} from "ionic-angular";

@Injectable()
export class FilesService {

  constructor(private fileOpener2: FileOpener,
              private platform: Platform) {
  }

  openDocument(file: any, name?: string): boolean {
    let mimeType = this.getMimeType(file);

    if (mimeType) {
      let arr = file.file;
      let byteArray = new Uint8Array(arr);

      if (this.platform.is('core')) {
        let a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([byteArray], {type: mimeType}));
        a.download = 'temp';

        a.click();
      }
      else if (this.platform.is('mobile')) {
        let fileManager = new File();
        let v=this.platform.version();

        let filePath = this.platform.is('android') ? v.major > 5 ?  fileManager.dataDirectory : fileManager.externalCacheDirectory
          : this.platform.is('ios') ? fileManager.cacheDirectory : '';

        let fileName = `tempFile.${file.extension}`;
        fileManager.writeFile(filePath, fileName, new Blob([byteArray]), {replace: true}).then(res => {
          this.fileOpener2.open(filePath + fileName, mimeType).catch(e => alert(e));
        });
      }

      return true;
    }
    return false;
  }

  getFileTypeClass(extension: string): string {
    let cssClass = '';
    switch (extension) {
      case 'pdf':
        cssClass = 'pdf-icon';
        break;

      case 'tiff':
        cssClass = 'tiff-icon';
        break;

      case 'TIF':
        cssClass = 'tiff-icon';
        break;

      case 'msg':
        cssClass = 'email-icon';
        break;

      case 'txt':
        cssClass = 'txt-icon';
        break;

      case 'doc':
        cssClass = 'doc-icon';
        break;

      case 'docx':
        cssClass = 'doc-icon';
        break;

      case 'ppt':
        cssClass = 'ppt-icon';
        break;

      case 'pptx':
        cssClass = 'ppt-icon';
        break;

      case 'xml':
        cssClass = 'xml-icon';
        break;

    }

    return cssClass;
  }

  getMimeType(file: IFile) {
    let mimeType;
    if (file.extension == 'pdf' && file.file)
      mimeType = 'application/pdf';
    else if (file.extension == 'txt' && file.file)
      mimeType = 'text/plain';
    else if (file.extension == 'tiff' && file.file)
      mimeType = 'image/tiff';
    else if ((file.extension == 'doc') && file.file)
      mimeType = 'application/msword';
    else if ((file.extension == 'docx') && file.file)
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    else if ((file.extension == 'ppt' || file.extension == 'pptx') && file.file)
      mimeType = 'application/mspowerpoint';
    else if (file.extension == 'xml' && file.file)
      mimeType = 'application/xml';
    else if (file.extension == 'msg')
      mimeType = 'application/vnd.ms-outlook';

    return mimeType;
  }
}
