import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'add-offers',
    templateUrl: './add.offer.html',
    styleUrls: ['./offers.component.css']
})
export class AddOffersComponent implements OnInit {
    discountType: any;
    amount: boolean;
    percentage: boolean;
    constructor(private appService: AppService) { }

    ngOnInit() {
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
    addCoupon(id) {
        var data = {
            'voucher_code': '',
            'total_count': '',
            'available_count': '',
            'discount_type': '',
            'discount_amount': '',
            'discount_percentage': '',
            'minimum_value': ''

        }
        this.appService.postOffersUrl(id).subscribe(resp => {

        })
    }

}
