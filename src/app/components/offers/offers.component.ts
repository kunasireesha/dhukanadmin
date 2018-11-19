import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
    coupons: any;
    constructor(private AppService: AppService) { }

    ngOnInit() {
        this.getOffers();
    }
    getOffers() {
        this.AppService.getOffers().subscribe(resp => {
            this.coupons = resp.json().data;
        })
    }
    addCoupon() {

    }

}
