import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router'
import { OrdersDetailsService } from './orders-details.service';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  providers:[OrdersDetailsService]
})
export class OrderDetailsComponent implements OnInit {
	item = {
		item:"",
		amount: 0,
		price: 0,
		comment:""
	}

	errors = [] ;
	orderId ; 
  order = {}; 
  buttonName = "remove";
  orderMembers = [] ;
  joinedMembers = [] ;
  invitedFriends_Title = "Invited Friends";
  invitedFriends_modalLinkTitle = " 10 friends invited, click to view! ";

  joinedFriends = "Invited Friends";
  joinedFriends_modalLinkTitle = " 10 friends invited, click to view! ";

  constructor(private ordersDetailsService: OrdersDetailsService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  	// get group id from route 
  	this.activatedRoute.params.subscribe((params: any ) => {
  		this.orderId = params['id'];
  	})
	// get meals list and assign it 
   this.getOrder();

  }

  getOrder(){
      this.ordersDetailsService.getOrder(this.orderId).subscribe(
      (response: any) => {
      console.log(response)
      if(response.status){
        // do logic 
        this.setOrderInfo(response.order);
      }else{
        this.router.navigate(['/orders'])
      }
    })
  }
  validateItem(): Array<string>{
		let errors = [] ;
		if(this.item.item.trim() == "")
			errors.push("Name cannot be empty");
		if(this.item.price == 0 )
			errors.push("Price cannot be equal to zero");
		if(this.item.amount == 0 )
			errors.push("Amount cannot be equal to zero");

		return errors; 
	}

  
  addItem(form: any){
  	this.errors = this.validateItem() ;

  	if(this.errors.length == 0 )
  		this.sendItem(this.item);
  }
  
  setOrderInfo(order: any){
  	this.orderMembers = [] ;
    this.order = order;
    // if is user, push only one element to the array,
    // else make the order members equals the retrieved array 
    if(order.invited_user){
      this.orderMembers.push(order.invited_user)
      this.invitedFriends_modalLinkTitle = '1 friend invited, click to view!'
      this.invitedFriends_modalLinkTitle = '1 friend invited, click to view!'
    }else{
      this.getOrderMembers(order.invited_group._id);
      this.invitedFriends_modalLinkTitle = order.invited_group.members.length+' friend invited, click to view!'
    }
    this.joinedMembers = order.joined_members ;
    this.joinedFriends_modalLinkTitle = order.joined_members.length+' friend joined, click to view!'
    console.log(this.joinedFriends_modalLinkTitle)
  }
  getOrderMembers(id: any){
    this.ordersDetailsService.getOrderMembers(id).subscribe(
        (response: any) =>{
          if(response.status){
            this.orderMembers = response.group.members ;
          }
          console.log(response, 'order members ');
        }
      )
  }
  sendItem(item: any){
  	item = {item: item.item, amount: item.amount.toString(), price: item.price.toString(), comment: item.comment }
  	this.ordersDetailsService.addMeal(this.orderId, item).subscribe(
  		(response: any) => {
  			if(response.status){
  				this.getOrder();
  			}	
  		}
  		);
  }  

  removeUser(id: any){
    console.log(id);
  }
}
