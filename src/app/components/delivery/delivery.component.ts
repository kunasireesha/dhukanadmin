import { Component, OnInit } from '@angular/core';
import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Router, NavigationExtras } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
    selector: 'app-delivery',
    templateUrl: './delivery.component.html',
    styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
    p: number = 1;
    constructor(private appService: AppService, public router: Router, private spinnerService: Ng4LoadingSpinnerService) { }
    delData;
    url;
    ngOnInit() {
        this.getDelivery();
        this.url = 'http://versatilemobitech.co.in/DHUKAN/images/';

    }
    getDelivery() {
        this.spinnerService.show();
        this.appService.getDelivery().subscribe(resp => {
            this.spinnerService.hide();
            this.delData = resp.json().data;
        }, err => {

        })
    }
    delete(uId) {
        this.spinnerService.show();
        var data = {
            'id': uId
        }
        swal("Do you want to delete?", "", "warning", {
            buttons: ["Cancel!", "Okay!"],
        }).then((value) => {

            if (value === true) {
                this.appService.deleteDelivery(data).subscribe(resp => {
                    this.spinnerService.hide();
                    swal(resp.json().data, "", "success");
                    this.getDelivery();
                }, error => {

                })
            } else {
                return;
            }
        });
    }
    edit(uId) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                deliveryId: uId
            }
        }
        this.router.navigate(['/addDelivery'], navigationExtras);
    }
}

