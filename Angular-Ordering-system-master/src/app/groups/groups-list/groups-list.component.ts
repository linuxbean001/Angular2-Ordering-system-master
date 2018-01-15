import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../groups.service';
@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  ownedGroups: Array<any>  ;
  joinedGroups: Array<any>  ;
  constructor(private groupService: GroupsService) { }

  ngOnInit() {
     this.setGroups() ;
    this.groupService.refreshGroups.subscribe(
        (refresh: any) => {
         this.setGroups() ;
        }
      )
    }
  setGroups(){
        this.groupService.getGroups().subscribe(
          (groups: any) => {
            this.ownedGroups = groups.ownedGroups; 
            this.joinedGroups = groups.joinedGroups;
          }
        )
    }
}
