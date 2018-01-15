import { Component, OnInit, Input } from '@angular/core';
import { LocalstorageService } from '../../localstorage.service';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  @Input() group : any ; 
  @Input() hiddenControls: boolean = true ;

  title:string = "Group" ;
  modalLinkTitle:string = "Members" ;
  buttonName = "remove";
  constructor(private groupService: GroupsService, private localStorageService: LocalstorageService) { }
  groupMembers = [] 
  ngOnInit() {
  }

  viewGroup(g: number){
    this.groupService.getGroup(g).subscribe(
      (response:any ) => {
        if(response.status)
          this.groupMembers = response.group.members;
          this.title = "Group" + response.group.name;
      }
      )  
  }
  deleteGroup(g: number){
  	this.groupService.deleteGroup(g).subscribe(
      (response:any )=> {
        console.log(response);
        if(response.status){
          this.groupService.refreshGroups.emit(1);
        }
      }
    );
  }

}
