import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class FileToBase64Service {
  fileToBase64Event = new EventEmitter<any>() ;
  constructor() { }
  convert(file: any){
  	if(file){
		let reader = new FileReader() ;
		reader.onload = (readerEvt: any) => {
            var binaryString = readerEvt.target.result;
           	 this.fileToBase64Event.emit("data:"+file.type+";base64,"+btoa(binaryString));
		}
        reader.readAsBinaryString(file);
	}
  }
}
