import { Component, OnInit } from '@angular/core';
import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'add-delivery',
    templateUrl: './add.delivery.html',
    styleUrls: ['./delivery.component.css']

})
export class AddDeliveryComponent implements OnInit {
    deliveryId;
    constructor(private appService: AppService, private route: ActivatedRoute, public router: Router) {
        this.route.queryParams.subscribe(params => {
            this.deliveryId = params.deliveryId
        })
    }
    contact;
    email;
    password;
    phone;
    ngOnInit() {
        this.getDelivory();
    }
    addDelivory() {
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
                swal(res.json().message, "", "success");
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
    getDelivory() {

    }

}
