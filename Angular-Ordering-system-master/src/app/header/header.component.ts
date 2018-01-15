import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications/notifications.service';
import { OrdersService } from '../orders/orders.service';
import { Router } from '@angular/router'
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NotificationsService, OrdersService]
})
export class HeaderComponent implements OnInit {
  username = "";
  imageURL = "" ;
  noOfNotifications = 0;
  notifications = []
  constructor(private ordersService: OrdersService, private notificationsService: NotificationsService, private router: Router, private localStorageService: LocalstorageService) {
    this.notificationsService.getLatestNotifications().subscribe(
				(obj: any) =>
					{if(obj.status) this.noOfNotifications = obj.numberOfnotifications }
				)
    this.notificationsService.join(this.localStorageService.getData().id)
    this.notificationsService.getNotification().subscribe((data)=>{
      this.noOfNotifications++;
      console.log('increase notifications')
    },(err)=>{
      console.log('error notification')
      console.log(err)
    })
    this.username = localStorageService.getUsername();
    this.imageURL = localStorageService.getProfilePic();
    console.log(this.imageURL)
  	// this.noOfNotifications = 2 ;
  }

  ngOnInit() {
  }
  showNotifications(){
    this.notificationsService.getLatestNotifications().subscribe(
				(obj: any) =>
					{if(obj.status) this.notifications = obj.Notifications }
				)
    this.notificationsService.updateToSeen().subscribe((response: any)=>{
      if(!response.status){
          console.log("error in seen all")
      }else{
          console.log("all seen")
          this.noOfNotifications = 0 ;
      }
    })
    // this.noOfNotifications = 0 ;
  }
  joinOrder(order_id,from_id,noti_id){
    //send accepted notifications to order owner
    let notiObj = {
      type:"text",
      state:"accepted",
      orderID:order_id
    }
    this.notificationsService.sendNotification(JSON.stringify(notiObj)).subscribe(
        (response: any) =>{
          if(!response.status){
            console.log("notification not added in database")
          }else{
            console.log("notification added in database successfully")
            //notify order owner
            this.notificationsService.notify([from_id])
          }
    })
    this.notificationsService.updateNotification(JSON.stringify(notiObj),noti_id).subscribe(
        (response: any) =>{
          if(!response.status){
            console.log("notification not updated in database")
          }else{
            console.log("notification updated in database successfully")
            this.ordersService.joinOrder(order_id).subscribe((response: any)=>{
              if(!response.status){
                console.log("can not joined the order")
              }else{
                console.log("you joined the order")
              }
            });
          }
    })
  }
  cancelOrder(order_id,from_id,noti_id){
    //send accepted notifications to order owner
    let notiObj = {
      type:"text",
      state:"rejected",
      orderID:order_id
    }
    this.notificationsService.sendNotification(JSON.stringify(notiObj)).subscribe(
        (response: any) =>{
          if(!response.status){
            console.log("rejection notification not added in database")
          }else{
            console.log("rejection notification added in database successfully")
            //notify order owner
            this.notificationsService.notify([from_id])
          }
    })
    this.notificationsService.updateNotification(JSON.stringify(notiObj),noti_id).subscribe(
        (response: any) =>{
          if(!response.status){
            console.log("cancel notification not updated in database")
          }else{
            console.log("cancel notification updated in database successfully")
          }
    })
  }
  logout(){
    console.log('logout');
    console.log(this.localStorageService.isLoggedIn());
    console.log(this.localStorageService.getData().id)
    this.notificationsService.disconnect(this.localStorageService.getData().id)
    this.localStorageService.removeStoredData();
    this.router.navigate(['/login'])

  }
}
