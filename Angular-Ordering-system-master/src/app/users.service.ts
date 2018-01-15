import { Injectable } from '@angular/core';
import { ApiRouterService } from './api-router.service';
import { Http, Response ,Headers, RequestOptions} from '@angular/http';
import { LocalstorageService } from './localstorage.service';
import { HeadersClass } from './headers'; 

@Injectable()
export class UsersService extends HeadersClass {

  constructor(private http: Http, private apiRouter: ApiRouterService) {
    super(); 
   }
  getUsers(){
  	return this.http.get(this.apiRouter.getUsersRoute()+"/search/email/@", this.options) 
  			.map((users: Response) => users.json());
  }
}
