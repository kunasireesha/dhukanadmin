import { Component, OnInit } from '@angular/core';
import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
    selector: 'add-delivery',
    templateUrl: './add.delivery.html',
    styleUrls: ['./delivery.component.css']

})
export class AddDeliveryComponent implements OnInit {
    deliveryId;
    constructor(private appService: AppService, private route: ActivatedRoute, public router: Router, private spinnerService: Ng4LoadingSpinnerService) {
        this.route.queryParams.subscribe(params => {
            this.deliveryId = params.deliveryId
        })
    }
    contact;
    email;
    password;
    phone;
    deliveryImage;
    path = 'http://versatilemobitech.co.in/DHUKAN/images/'
    ngOnInit() {
        this.getDelivorybyId();
    }
    addDelivory() {
        this.spinnerService.show();
        var data = {
            "first_name": this.contact,
            'email': this.email,
            'image': this.strImage,
            'password': this.password,
            'phone': this.phone
        }
        if ((this.contact = this.email = this.strImage = this.password = this.phone) === undefined) {
            swal("Please fill the fields", "", "warning");
        }
        else {
            this.appService.addDeliveryUrl(data).subscribe(res => {
                this.spinnerService.hide();
                swal(res.json().message, "", "success");
                this.router.navigate(['/delivery']);
            }, error => {
                swal(error.json().message, "", "error");
            })
        }

    }
    image;
    strImage;
    changeListener($event): void {
        this.readThis($event.target);
    }

    readThis(inputValue: any): void {
        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.image = myReader.result;
            this.strImage = this.image.split(',')[1];
        }
        myReader.readAsDataURL(file);
    }
    getDelivorybyId() {
        this.spinnerService.show();
        var data = {
            'id': this.deliveryId
        }
        this.appService.getDeliverybyId(data).subscribe(resp => {
            this.spinnerService.hide();
            this.contact = resp.json().data[0].first_name;
            this.email = resp.json().data[0].email;
            this.password = resp.json().data[0].password;
            this.phone = resp.json().data[0].phone;
            this.deliveryImage = resp.json().data[0].image;

        })
    }
    updateDelivery() {
        this.spinnerService.show();
        var data = {
            'id': this.deliveryId,
            'first_name': this.contact,
            'email': this.email,
            'image': this.strImage,
            'password': this.password,
            'phone': this.phone
        }
        this.appService.updateDelivery(data).subscribe(resp => {
            if (resp.json().status === 200) {
                this.spinnerService.hide();
                swal(resp.json().message, "", "success");
                this.router.navigate(['/delivery']);
            }
        })
    }
}
