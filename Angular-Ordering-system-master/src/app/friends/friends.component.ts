import { Component, OnInit } from '@angular/core';
import { FriendsService } from './friends.service';
import { UsersService } from '../users.service';
import { NewGroupUsersService } from '../new-group-users.service';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  providers: [FriendsService, UsersService]
})
export class FriendsComponent implements OnInit {
  usersGroupTitle: string = "Your Friend Name";
  usersGroupButton: string = "unfriend";
  allFriends = [] 
  allUsers = [] 
  constructor(private friendsService: FriendsService, private usersService: UsersService) { }

  ngOnInit() {
  	this.friendsService.getFriends().subscribe(
  		(friends: any) => {console.log(friends);
        if(friends.status)
          this.allFriends = friends.friends.friends ;  
  		}

  		);
  	this.usersService.getUsers().subscribe(
  		(users: any) => {
      	this.allUsers = users;
        // console.log(users);
  		}

  		);
  }

  addUser(user: any){
    if(user._id && !this.checkDuplicate(user) ){
      // send post request, if success append to allFriends array
      this.friendsService.addFriend(user._id).subscribe(
        (response: any) => {
          console.log(response);
          if(response.status){
            this.allFriends.push(user);
          }
        }
        )
    }
  }
  checkDuplicate(user: any){
    for(let i = 0 ; i < this.allFriends.length; i++){
      if(this.allFriends[i]._id == user._id){
        return true ;
      }
    }
    return false;
  }

  removeUser(id: any){
    console.log(id)
    // send delete request, if success remove from the array
    
    this.friendsService.removeFriend(id).subscribe(
      (response: any)=>{
        if(response.status){
          for(var i = 0; i<this.allFriends.length; i++ ){
            if(this.allFriends[i]._id == id ){
              this.allFriends.splice(i,1);
            }
          }}})
  }

}
