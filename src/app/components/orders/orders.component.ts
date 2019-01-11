import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    delivryBoy;
    constructor(private appServie: AppService) { }
    orders;
    ngOnInit() {
        this.getOrders();
        this.getDelivery();
    }
    getOrders() {
        this.appServie.getOrders().subscribe(res => {
            this.orders = res.json().data;
        }, error => {

        })
    }
    getDelivery() {
        this.appServie.getDelivery().subscribe(resp => {
            this.delivryBoy = resp.json().data;
        })
    }
    deliveryPerson(val) {

    }
}
