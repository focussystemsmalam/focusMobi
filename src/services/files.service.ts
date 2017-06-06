import {Injectable} from "@angular/core";
import {FileOpener} from "@ionic-native/file-opener";
import {IFile} from "../server/server-models/file-model";
import {Base64ToGallery} from "@ionic-native/base64-to-gallery";
import {File} from "@ionic-native/file";

@Injectable()
export class FilesService {

  constructor(
      private fileOpener2     : FileOpener,
      private base64ToGallery : Base64ToGallery
  ) {}

  openDocument( file: any/*IFile*/ , name?:string):boolean {
      let mimeType = this.getMimeType(file);


      if(mimeType){
      debugger;
        let arr = file.file;
        let bytearray = new Uint8Array(arr);
        let fileManager = new File();
        let filePath = fileManager.dataDirectory;
        let fileName=`${file.inboxNum}.${file.extension}`;
        fileManager.writeFile(filePath, fileName, new Blob([bytearray]),{replace:true}).then(res=>{
          this.fileOpener2.open(filePath+fileName, mimeType).catch(e=>alert(e));
        });



        // window.open(window.URL.createObjectURL(new Blob([bytearray], {type: mimeType})));
        // window.navigator.msSaveOrOpenBlob(new Blob([bytearray]));
        // let a = window.document.createElement('a');
        // a.href = window.URL.createObjectURL(new Blob([bytearray], {type: mimeType}));
        // a.download = 'test';
        //
        // a.click();


        alert('finished');

         // TODO: eyal
          /*this.base64ToGallery.base64ToGallery(file.file, { prefix: '_img' }).then(
              res => console.log('Saved image to gallery ', res),
              err => console.log('Error saving image to gallery ', err)
          );

          this.fileOpener2.openBase64(
             name||'file',
             file.extension,
             file.file,
             mimeType,
             {
               error : function(e) {
                 console.log('error status: ' + e.status + ' error message: ' + e.message);
                 alert('error: ' + JSON.stringify(e));

                },
               success : function() {
                 console.log('file opened');
               }
             }
         );*/
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
  getMimeType(file:IFile){
      let mimeType;
      if(file.extension=='pdf' && file.file)
          mimeType = 'application/pdf';
      else if(file.extension=='txt' && file.file)
          mimeType='text/plain';
      else if(file.extension=='tiff' && file.file)
          mimeType='image/tiff';
      else if((file.extension=='doc') && file.file)
          mimeType='application/msword';
      else if((file.extension=='docx') && file.file)
          mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      else if((file.extension=='ppt' || file.extension=='pptx') && file.file)
          mimeType='application/mspowerpoint';
      else if(file.extension=='xml' && file.file)
          mimeType='application/xml';
      else if(file.extension=='msg')
          mimeType='application/vnd.ms-outlook';

      return mimeType;
  }
}
