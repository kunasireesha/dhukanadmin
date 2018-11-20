import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
    coupons: any;
    couponsId: any;
    constructor(private AppService: AppService, public router: Router) { }

    ngOnInit() {
        this.getCoupons();
    }
    getCoupons() {
        this.AppService.getOffers().subscribe(resp => {
            this.coupons = resp.json().data;
            console.log(this.coupons);
            // for (var i = 0; i < this.coupons.length; i++) {
            //     this.couponsId = this.coupons[i].id;
            //     console.log(this.couponsId);
            // }
        })
    }
    editOffer(id) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                offerId: id
            }
        }
        this.router.navigate(['/addOffers'], navigationExtras);
    }
    deleteOffer(id) {
        swal("Do you want to delete?", "", "warning", {
            buttons: ["Cancel!", "Okay!"],
        }).then((value) => {

            if (value === true) {
                this.AppService.deleteOfferById(id).subscribe(response => {
                    swal("Deleted successfully", '', 'success');
                    this.getCoupons();
                }, error => {

                })
            } else {
                return;
            }
        });

    }
}
