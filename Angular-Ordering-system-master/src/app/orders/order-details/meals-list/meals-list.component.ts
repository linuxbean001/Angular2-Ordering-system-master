import { Component, OnInit, Input } from '@angular/core';
import { LocalstorageService } from '../../../localstorage.service';
import { OrdersDetailsService } from '../orders-details.service'; 
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.css']
})
export class MealsListComponent implements OnInit {
  @Input() mealsList = [] ; 

  constructor(private ordersDetailsServce: OrdersDetailsService,private activateRoute: ActivatedRoute, private localStorageService: LocalstorageService) { }

  ngOnInit() {
  	console.log(this.mealsList);
  }
  deleteMeal(id: any){
  	this.ordersDetailsServce.deleteMeal(this.activateRoute.snapshot.params['id'],id).subscribe(
  		(response: any) => {
  			console.log(response);
  			if(response.status){
  				this.removeMealFromArray(response.deleted_meal._id)
  			}
  		}
  		);
  }
  // remove the meal from the viewed meals list 
  removeMealFromArray(id: any){
  	console.log(id);
  	
  	for(let i = 0; i< this.mealsList.length; i++ ){
  		if(this.mealsList[i]._id == id ){
  			this.mealsList.splice(i,1);
  		}
  	}
  }

  // check if this is my meal 
  isMyMeal(id: any){
  	if(this.localStorageService.getLoggedUserId() == id )
  		return true ;
  	else
  		return false
  }
}
