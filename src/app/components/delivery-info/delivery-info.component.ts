import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-delivery-info',
    templateUrl: './delivery-info.component.html',
    styleUrls: ['./delivery-info.component.css']
})
export class DeliveryInfoComponent implements OnInit {
    title;
    ckeditorContent;
    encodeData;
    decodeData;
    deliveryData;
    deliveryId;
    constructor(private appService: AppService) { }

    ngOnInit() {
        this.getDeliveryInfo();
    }
    deliveryInfo() {
        this.encodeData = btoa(this.ckeditorContent);
        var data = {
            'title': this.title,
            'description': this.encodeData
        }
        this.appService.termsFooter(data).subscribe(resp => {

        })
    }
    getDeliveryInfo() {
        this.appService.getDeliveryInfo().subscribe(resp => {
            this.deliveryData = resp.json().result[0].description;
            this.decodeData = atob(this.deliveryData);
            this.ckeditorContent = this.decodeData;
            this.title = resp.json().result[0].type;
            this.deliveryId = resp.json().result[0].id;
        })
    }
    updateDelivery() {
        this.encodeData = btoa(this.ckeditorContent);
        var data = {
            'title': this.title,
            'description': this.encodeData,
            'id': this.deliveryId
        }
        this.appService.updateTerms(data).subscribe(resp => {
            if (resp.json().status === 200) {
                swal('update content successfully', '', 'success');
            }
        })
    }

}
