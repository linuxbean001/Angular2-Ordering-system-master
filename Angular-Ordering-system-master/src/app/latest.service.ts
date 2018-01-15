import { Injectable } from '@angular/core';
import { Http, Response ,Headers, RequestOptions} from '@angular/http';
import { HeadersClass } from './headers';
import { ApiRouterService } from './api-router.service';
import { LocalstorageService } from './localstorage.service';

@Injectable()
export class LatestService extends HeadersClass{

  constructor(private http: Http, private apiRouter: ApiRouterService) {
  	super() ;

  }
  getLatestOrders(){
		return this.http.get(this.apiRouter.getOrdersRoute(),this.options)
			.map((response: Response) => response.json());
	}
  getLatestActivities(){
    return this.http.get(this.apiRouter.getUsersRoute()+'/activity',this.options)
    .map((response: Response) => response.json());
  }

}
