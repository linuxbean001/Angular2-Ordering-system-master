import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { User } from '../User';
import 'rxjs/Rx';

import { ApiRouterService } from '../api-router.service';
@Injectable()
export class RegisterationService {

  constructor(private http: Http, private apiRouter: ApiRouterService) { }

  register(user: any){
	const headers = new Headers() ;
	headers.append('Content-Type','application/json');
  
  return this.http.post( this.apiRouter.getRegisterationRoute(), user, { headers: headers })
  			.map((data: Response) => data.json());
  }
}
