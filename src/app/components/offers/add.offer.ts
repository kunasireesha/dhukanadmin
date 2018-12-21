import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
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
    model;
    model1;
    constructor(private appService: AppService, private route: ActivatedRoute, public router: Router, private spinnerService: Ng4LoadingSpinnerService) {
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
    addOffer() {
        var data = {
            'voucher_code': this.coupon,
            'total_count': this.total,
            // 'available_count': this.disAmt,
            'discount_type': this.discountType,

            'discount_amount': this.disAmt,
            'discount_percentage': this.disPer,
            'minimum_value': this.upto,
            'start_date': this.model.formatted,
            'end_date': this.model1.formatted

        }
        console.log(data);
        this.appService.postOffersUrl(data).subscribe(resp => {
            console.log(resp.json());
            swal(resp.json().message, "", "success");
            this.router.navigate(['/offers']);
        })
    }
    getOfferbyId() {
        this.spinnerService.show();
        this.appService.getOfferbyId(this.offerId).subscribe(resp => {
            this.spinnerService.hide();
            this.offers = resp.json().data;
            // this.
            this.coupon = this.offers[0].voucher_code;
            this.disAmt = this.offers[0].discount_amount;
            this.disPer = this.offers[0].discount_percentage;
            this.total = this.offers[0].total_count;
            this.upto = this.offers[0].minimum_value;
            this.model = this.offers[0].start_date;
            this.model1 = this.offers[0].end_date;
        })
    }
    updateOfferById() {
        this.spinnerService.show();
        var data = {
            'voucher_code': this.coupon,
            'total_count': this.total,
            // 'available_count': '',
            'discount_type': this.discountType,
            'discount_amount': this.disAmt,
            'discount_percentage': this.disPer,
            'minimum_value': this.upto,
            'start_date': this.model.formatted,
            'end_date': this.model1.formatted
        }
        this.appService.updateOfferById(this.offerId, data).subscribe(resp => {
            this.spinnerService.hide();
            swal(resp.json().message, "", "success");
            this.router.navigate(['/offers']);
        })
    }
    DisType = {
        '1': 'Flat',
        '2': 'Percentage'
    }
}
