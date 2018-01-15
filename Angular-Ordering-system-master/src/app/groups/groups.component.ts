import { Component, OnInit } from '@angular/core';
import { GroupsService } from './groups.service';
import { NewGroupUsersService } from '../new-group-users.service';
import { FriendsService } from '../friends/friends.service';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  providers:[GroupsService, NewGroupUsersService, FriendsService]
})
export class GroupsComponent implements OnInit {
  usersGroupTitle: string = "Your Friend Name";
  usersGroupButton: string = "remove";
  groupName: string = "";
  validGroupName: boolean = true ; 
  validFriendList: boolean = true ;
  friendsList = []  ;
  groupMembers = [] ;
  errors = [] ;
  constructor(private groupUsersService: NewGroupUsersService, private groupService: GroupsService, private friendsService: FriendsService) { }

  ngOnInit() {
    this.groupService.getGroups().subscribe(

      (data: any) => console.log(data)

      );
    this.friendsService.getFriends().subscribe(

        (friends: any) => this.friendsList = friends.friends.friends 

      );
  }
  removeUser(id: any){
    console.log(id)
    for(var i = 0; i<this.groupMembers.length; i++ ){
      if(this.groupMembers[i]._id == id ){
        this.groupMembers.splice(i,1);
      }
    }
  }  
  checkDuplicate(user: any){
    for(let i = 0 ; i < this.groupMembers.length; i++){
      if(this.groupMembers[i]._id == user._id){
        return true ;
      }
    }
    return false;
  }
  addUser(user: any){
    if(user._id && !this.checkDuplicate(user) )
      this.groupMembers.push(user);
  }

  validateGroup(){
    this.errors = [] ;
    this.groupName = this.groupName.trim();
    // check if users array has no members 
    if(this.groupMembers.length == 0 ){
     this.validFriendList = false ;
     this.errors.push('Group list must contain at least one friend!')
    }else{
     this.validFriendList = true ;
    }

    // check if group name is empty 
    if(this.groupName.length == 0){
     this.validGroupName = false ;
     this.errors.push('Group name cannot be empty!')
    }else{
     this.validGroupName = true ;
    }
  }
  getUsersIds(){
    let usersArray = [] ;
    this.groupMembers.forEach(function(user){
      usersArray.push(user._id);
    });
    return usersArray;
  }
  submitGroup(){
    let groupObj = {group_name: this.groupName, members: this.getUsersIds()}
    console.log(groupObj);
    this.groupService.addGroup(groupObj).subscribe(
       (response: any) => {
         console.log(response);
         if(response.status)
           this.groupService.refreshGroups.emit(1);
         else
           this.errors.push(response.error)
       }
    );
  }
  addGroup(){

  	this.validateGroup() ;

  	if(this.validGroupName && this.validFriendList)
      this.submitGroup();
  	
  }

}
