import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [NotificationsService]
})
export class NotificationsComponent implements OnInit {
  notifications = []
  count = 0
  constructor() {
    // this.notificationsService.join('ssssss')
    // this.notificationsService.getNotification().subscribe((data)=>{
    //   this.count++;
    //   console.log('increase notifications')
    // },(err)=>{
    //   console.log('error notification')
    //   console.log(err)
    // })
  }

  ngOnInit() {
    // this.notificationsService.join("58e235e67a12b018feb4d862")
    // this.notificationsService.getNotification();
  }
  invite(){
    // this.notificationsService.sendInvitation({user_id:"58e235e67a12b018feb4d862",orderID:"58e4e4f348433e4958d2c38f",users:["58e235e67a12b018feb4d863","58e235e67a12b018feb4d864"]})
  }
}
