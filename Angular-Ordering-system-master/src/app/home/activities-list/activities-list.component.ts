import { Component, OnInit } from '@angular/core';
import { LatestService } from './../../latest.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css'],
  providers: [LatestService]
})
export class ActivitiesListComponent implements OnInit {
  activities: Array<any>;
  constructor(private latestService: LatestService) { }

  ngOnInit() {
    this.setLatestActivities();
  }
  setLatestActivities(){

    this.latestService.getLatestActivities().subscribe(
      (activities: any) => {
        console.log("get latest activities: ")
        console.log(activities)
        this.activities = activities.new_Orders.concat(activities.joined_Orders).sort(this.mySort('date'));
      }
    )
  }
  mySort(property) {
      return function (a,b) {
          return (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
      }
  }
}
