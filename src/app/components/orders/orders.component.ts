import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

    constructor(private appServie: AppService) { }

    ngOnInit() {
        this.getOrders();
    }
    getOrders() {
        this.appServie.getOrders().subscribe(res => {
            console.log(res.json());
        }, error => {

        })
    }


}
