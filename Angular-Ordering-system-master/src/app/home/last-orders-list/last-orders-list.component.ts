import { Component, OnInit } from '@angular/core';
import { LatestService } from './../../latest.service';

@Component({
  selector: 'app-last-orders-list',
  templateUrl: './last-orders-list.component.html',
  styleUrls: ['./last-orders-list.component.css'],
  providers: [LatestService]
})
export class LastOrdersListComponent implements OnInit {
  lastOrders: Array<any>  ;
  constructor(private latestService: LatestService) { }

  ngOnInit() {
    this.setLastOrders();
  }
  setLastOrders(){
    this.latestService.getLatestOrders().subscribe(
      (orders: any) => {
        console.log(orders)
        this.lastOrders = orders.owned_orders.concat(orders.invited_orders).sort(this.mySort('date'));
      }
    )
  }
  mySort(property) {
      return function (a,b) {
          return (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
      }
  }
}
