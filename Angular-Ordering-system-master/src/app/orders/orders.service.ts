import { Injectable } from '@angular/core';
import { Http, Response ,Headers, RequestOptions} from '@angular/http';
import { HeadersClass } from '../headers';
import { ApiRouterService } from '../api-router.service';

@Injectable()
export class OrdersService extends HeadersClass {

  constructor(private http: Http, private apiRouter: ApiRouterService) {
  	super() ;
  }

	addOrder(order: any){
		return this.http.post(this.apiRouter.getOrdersRoute(),order,this.options)
			.map((response: Response) => response.json());
	}
  // sendInvitation(noti: any){
  //   return this.http.post(this.apiRouter.getNotificationsRoute(),noti,this.options)
	// 		.map((response: Response) => response.json());
  // }
  joinOrder(id: any){
    return this.http.put(this.apiRouter.getOrdersRoute()+"/"+id,{},this.options)
			.map((response:Response) => response.json());
  }
	getOrders(){
		return this.http.get(this.apiRouter.getOrdersRoute(),this.options)
			.map((response: Response) => response.json());
	}
	checkoutOrder(id: any){
		return this.http.put(this.apiRouter.getOrdersRoute()+"/finish/"+id,{},this.options)
			.map((response:Response) => response.json());
	}
	cancelOrder(id: any){
		return this.http.delete(this.apiRouter.getOrdersRoute()+"/"+id,this.options)
			.map((response:Response) => response.json());
	}
}
