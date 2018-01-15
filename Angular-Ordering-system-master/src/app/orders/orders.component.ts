import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers:[OrdersService]
})
export class OrdersComponent implements OnInit {
  owned_orders: Array<any> = [] 
  invited_orders: Array<any> = [] 
  constructor(private ordersService: OrdersService) { }
  error:string = '' ; 
  ngOnInit() {
  	this.ordersService.getOrders().subscribe(
  		(response: any) => {
  			if(response.status){
  				this.owned_orders = response.owned_orders; 
  				this.invited_orders = response.invited_orders;
  				console.log(response);
  			}

  			}
  		)	

  }
  
  changeCheckoutStatus(id: any){
  	for(let i = 0 ; i < this.owned_orders.length; i++){
  		if(this.owned_orders[i]._id == id)
  			this.owned_orders[i].checkout = true ;
  	}
  }

  removeOrder(id: any){
  	for(let i = 0 ; i < this.owned_orders.length; i++){
  		if(this.owned_orders[i]._id == id)
  			this.owned_orders.splice(i,1) ;
  	}
  }

  checkoutOrder(id: any){
  	console.log(id);
  	this.ordersService.checkoutOrder(id).subscribe(
  		(response: any) => {
  				console.log(response);
  				if(response.status){
  					this.changeCheckoutStatus(id);
  					this.error=''; 
  				}else{
  					this.error="Something went wrong, Please try again later!"
  				}
  			}
  		)
  }
  cancelOrder(id: any){
  	console.log(id);
  	this.ordersService.cancelOrder(id).subscribe(
  		(response: any) => {
  				console.log(response);
  				if(response.status){
  					this.removeOrder(id);
  					this.error=''; 
  				}else{
  					this.error="Something went wrong, Please try again later!"
  				}
  			}
  		)
  	
  }
}
