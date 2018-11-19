import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
    coupons: any;
    couponsId: any;
    constructor(private AppService: AppService) { }

    ngOnInit() {
        this.coupons();
    }
    getCoupons() {
        this.AppService.getOffers().subscribe(resp => {
            this.coupons = resp.json().data;
            // for (var i = 0; i < this.coupons.length; i++) {
            //     this.couponsId = this.coupons[i].id;
            //     console.log(this.couponsId);
            // }
        })
    }
}
