import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'add-offers',
    templateUrl: './add.offer.html',
    styleUrls: ['./offers.component.css']
})
export class AddOffersComponent implements OnInit {
    discountType: any;
    amount: boolean;
    percentage: boolean;
    coupon;
    upto;
    total;
    disPer;
    offerId;
    offers;
    disAmt;
    constructor(private appService: AppService, private route: ActivatedRoute, public router: Router) {
        this.route.queryParams.subscribe(params => {
            this.offerId = params.offerId
        })
    }

    ngOnInit() {
        this.getOfferbyId();
    }
    discount(event) {
        this.discountType = event;
        if (this.discountType === '1') {
            this.amount = true;
            this.percentage = false;
        }
        else {
            this.percentage = true;
            this.amount = false;
        }
    }
    addOffer(discValue) {
        var data = {
            'voucher_code': this.coupon,
            'total_count': this.total,
            // 'available_count': this.disAmt,
            'discount_type': this.discountType,
            'discount_amount': this.disAmt,
            'discount_percentage': this.disPer,
            'minimum_value': this.upto

        }
        this.appService.postOffersUrl(data).subscribe(resp => {
            console.log(resp.json());
            swal(resp.json().message, "", "success");
        })
    }
    getOfferbyId() {
        this.appService.getOfferbyId(this.offerId).subscribe(resp => {
            this.offers = resp.json().data;
            // this.
            this.coupon = this.offers[0].voucher_code;
            this.disAmt = this.offers[0].discount_amount;
            this.disPer = this.offers[0].discount_percentage;
            this.total = this.offers[0].total_count;
            this.upto = this.offers[0].minimum_value;

        })
    }
    updateOfferById() {
        var data = {
            'voucher_code': this.coupon,
            'total_count': this.total,
            // 'available_count': '',
            'discount_type': this.discountType,
            'discount_amount': this.disAmt,
            'discount_percentage': this.disPer,
            'minimum_value': this.upto
        }
        this.appService.updateOfferById(this.offerId, data).subscribe(resp => {
            swal(resp.json().message, "", "success");
        })
    }
    DisType = {
        '1': 'Flat',
        '2': 'Percentage'
    }
}
