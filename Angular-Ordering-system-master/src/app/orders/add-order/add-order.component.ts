import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../../friends/friends.service';
import { GroupsService } from '../../groups/groups.service' ;
import { OrdersService } from '../orders.service' ;
import { FileToBase64Service } from '../../file-to-base64.service';
import { NotificationsService } from '../../notifications/notifications.service';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  providers: [FriendsService, GroupsService, OrdersService, NotificationsService ]
})
export class AddOrderComponent implements OnInit {
	friend: boolean = false ;
	group: boolean = false ;

	friendsList: Array<any> = [] ;
	groupsList: Array<any> = [] ;

	types: Array<string> = ['Lunch','Breakfast'];

	successMessage:string = '' ;
	errors: Array<any> = [] ;


	order = {
		for: 'Lunch',
		resturantname: '',
		menu: '',
		invite: '',
		members: ''
	}

	constructor(private fileToBase64Service: FileToBase64Service, private friendsService: FriendsService, private groupsService: GroupsService, private ordersService: OrdersService, private notificationsService: NotificationsService) {
		this.fileToBase64Service.fileToBase64Event.subscribe((base64Format: any) => {this.order.menu = base64Format;})
	}

	ngOnInit() {
	}

	loadFriends(){
		this.friendsService.getFriends().subscribe(
				(friends: any) =>
					{if(friends.status) this.friendsList = friends.friends.friends }
				)
	}

	loadGroups(){
		// user can only invite people in groups he created
		this.groupsService.getGroups().subscribe(
			(groups: any) =>
				{if(groups.status){this.groupsList = groups.ownedGroups ;}}
			)
	}

	changeSelectedType(type: string){
		switch(type){
			case 'user':
				this.friend = true ;
				this.group = false ;
				this.loadFriends() ;
				this.order.members="";
			break ;

			case 'group' :
				this.friend = false ;
				this.group = true;
				this.loadGroups() ;
				this.order.members="";
			break ;
		}
	}

	selectMenu(input: any){
		let allowed_extensions = ['image/jpeg','image/png','image/jpg'] ;
		let file = input.files[0];
		if(allowed_extensions.indexOf(file.type) != -1 ){
			this.fileToBase64Service.convert(file);
			this.errors = [] ;
		}
		else
			this.errors.push("Only images with png, jpeg, jpg extensions are allowed");
	}

	validateOrder(): Array<string>{
		let errors = [] ;
		for (var property in this.order) {
		    if (this.order.hasOwnProperty(property)) {
		    	if(this.order[property].trim() == ""){
		    		errors.push(property + " Cannot be Empty ") ;
		    	}
		    }
		}
		return errors;
	}

	sendOrder(){
		// submit the form
		let orderObj = {
			name: this.order.for,
			restaurant: this.order.resturantname,
			invited_type: this.order.invite ,
			invited_id: this.order.members,
			menu: this.order.menu
		 }

		this.ordersService.addOrder(JSON.stringify(orderObj)).subscribe(
		(response: any) =>{
			if(!response.status){
				this.errors = response.errors ;
			}else{
				this.successMessage = response.order.name+' from ' + response.order.restaurant +" has been added successfully!";
        //send invitation notifications
        //fill invited members array
        //if invited user
        if(response.order.invited_user){
            let membersArray = [response.order.invited_user]
            let notiObj = {
              type:"action",
              orderID:response.order._id,
              members: membersArray
            }
            this.notificationsService.sendNotification(JSON.stringify(notiObj)).subscribe(
                (response: any) =>{
                  if(!response.status){
                    console.log("notification not added in database")
                  }else{
                    console.log("notification added in database successfully")
                    this.notificationsService.notify(notiObj.members)
                  }
            })
        //if invited group
        }else if(response.order.invited_group){
          this.groupsService.getGroup(response.order.invited_group).subscribe((response: any) =>{
            if(!response.status){
                this.errors = response.errors ;
            }else{
                let membersArray = [response.group.members]
                let notiObj = {
                  type:"action",
                  orderID:response.order._id,
                  members: membersArray
                }
                this.notificationsService.sendNotification(JSON.stringify(notiObj)).subscribe(
                    (response: any) =>{
                      if(!response.status){
                        console.log("notification not added in database")
                      }else{
                        console.log("notification added in database successfully")
                        this.notificationsService.notify(notiObj.members)
                      }
                })
            }
          })
        }

			}
		});
	}

	onSubmit(){
		// clear the errors array
		this.errors = [] ;
		// form validation
		this.errors = this.validateOrder();
		// send the request
		if(this.errors.length == 0 ){
			this.sendOrder();
		}

	}
}
