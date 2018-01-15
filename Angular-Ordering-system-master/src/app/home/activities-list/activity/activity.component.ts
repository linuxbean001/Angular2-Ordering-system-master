import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input() activity : any ;
  @Input() hiddenControls: boolean = true ;
  constructor() { }

  ngOnInit() {
    var d = new Date(this.activity.date);
    this.activity.date = d.toString();
  }

}
