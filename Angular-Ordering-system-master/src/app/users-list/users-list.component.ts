import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewGroupUsersService } from '../new-group-users.service';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() users: Array<any> = [];
  @Input() buttonName: string ; 
  @Output() removeUserEmitter = new EventEmitter<any>(); ;
  constructor(private groupUserService: NewGroupUsersService) { }
  checkDuplicateGroupMember(user: any){
    for(let i = 0 ; i < this.users.length ; i++ ){
      if(this.users[i]._id == user._id){
        return false ;
      }
    }
    return true ;
  }
  removeUser(id: any){
    this.removeUserEmitter.emit(id);
  }
  ngOnInit() {
    // this.groupUserService.pushedUsers.subscribe(
    //     (user: any) => {
    //       // console.log(user);
    //       console.log(this.users,'user list');
    //       if(this.checkDuplicateGroupMember(user)){
    //         this.groupUserService.users.push(user);
    //         this.users.push(user);
    //       }
    //       console.log(this.users,'update add users')
    //     }
    //   );
    // this.groupUserService.removedUsers.subscribe(
    //     (id: number) => {
    //       this.users = this.groupUserService.users;
    //     }
    //   );
    // this.groupUserService.refreshUsers.subscribe(
    //     (id: number) => {
    //       this.users = this.groupUserService.users;
    //     }
    //   );
  }

}
