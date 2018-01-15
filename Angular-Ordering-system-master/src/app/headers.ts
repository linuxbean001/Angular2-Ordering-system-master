import { Http, Response ,Headers, RequestOptions} from '@angular/http';
import { LocalstorageService } from './localstorage.service';

export class HeadersClass{

		access_token: string;
		options: RequestOptions ;
		localStorageService: LocalstorageService = new LocalstorageService()
		constructor(){
		  	this.access_token = this.localStorageService.getAccessToken();
		    const headers = new Headers() ;
		    headers.append('Content-Type','application/json');
		    headers.append('authorization',this.access_token);
		    console.log(this.access_token,'access token ');
		    this.options = new RequestOptions({headers: headers});
		    console.log('calling headers class')
		}
}
