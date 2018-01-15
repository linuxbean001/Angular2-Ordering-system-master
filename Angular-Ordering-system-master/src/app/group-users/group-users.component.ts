import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { NewGroupUsersService } from '../new-group-users.service';
@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css'],
})
export class GroupUsersComponent implements OnInit {
  @Input() title: string; 
  @Input() buttonName: string;
  @Input() usersSource =  [] ;
  @Input() membersSource = [] ;
  @Output() removeUserEmitter: EventEmitter<any> = new EventEmitter(); 
  @Output() addUserEmitter: EventEmitter<any> = new EventEmitter(); 
  constructor(private groupUserService: NewGroupUsersService) { }

  ngOnInit() {
    
  }
  removeUser(id:any){
    this.removeUserEmitter.emit(id);
  }
  addUser(user: any){

    let selectedId: string ;
    let selectedImg: string = ""; 
    for( let i = 0; i < this.usersSource.length ; i++ ){
      if(this.usersSource[i].email == user.value){
        selectedId = this.usersSource[i]._id ;
        console.log(selectedId, ' group-user')
        // add selected image when implemented in backend 
      }
    }
    let userObj = { name:user.value, image:selectedImg, _id:selectedId };
    console.log(userObj,'from group-user');
  	this.addUserEmitter.emit(userObj);
  }

  keyDown(user: any){
    
    // search for friends on key down
    user = user.value.trim() ;
    if(user.length != 0 ){
      console.log(user);
      this.groupUserService.keyDown(user);
    }
  }
}
