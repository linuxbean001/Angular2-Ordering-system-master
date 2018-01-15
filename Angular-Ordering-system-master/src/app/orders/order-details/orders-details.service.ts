 import { Injectable } from '@angular/core';
import { Http, Response ,Headers, RequestOptions} from '@angular/http';
import { HeadersClass } from '../../headers';
import { ApiRouterService } from '../../api-router.service';

@Injectable()
export class OrdersDetailsService extends HeadersClass{

  constructor(private http: Http, private apiRouter: ApiRouterService) { 
  	super() ;
  }

  getOrder(orderId: number){
  	return this.http.get(this.apiRouter.getOrdersRoute()+"/"+orderId, this.options)
  		.map((response: Response) => response.json() );
  }
  deleteMeal(orderId: any, mealId: number){
    return this.http.delete(this.apiRouter.getOrdersRoute()+"/"+orderId+"/meal/"+mealId, this.options)
      .map((response: Response) => response.json() ); 
  }
  addMeal(orderId: number, meal:any){
  	return this.http.post(this.apiRouter.getOrdersRoute()+"/"+orderId+"/meal", meal, this.options)
  		.map((response: Response) => response.json() );  	
  }
  getOrderMembers(groupId: any){
    return this.http.get(this.apiRouter.getGroupsRoute()+"/"+groupId, this.options)
      .map((response: Response ) => response.json() );
  }
}
