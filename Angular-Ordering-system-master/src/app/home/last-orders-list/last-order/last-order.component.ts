import { Component, OnInit, Input } from '@angular/core';
//import orderService
@Component({
  selector: 'app-last-order',
  templateUrl: './last-order.component.html',
  styleUrls: ['./last-order.component.css']
})
export class LastOrderComponent implements OnInit {
  @Input() order : any ;
  @Input() hiddenControls: boolean = true ;
  constructor() { }

  ngOnInit() {
    var d = new Date(this.order.date);
    this.order.date = d.toString();
  }
  viewOrder(){
    //redirect to order view
  }
}
