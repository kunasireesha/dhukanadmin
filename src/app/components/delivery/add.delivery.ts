import { Component, OnInit } from '@angular/core';
import { AppService } from './../../services/dhukan/dhukan-data.service';

@Component({
    selector: 'add-delivery',
    templateUrl: './add.delivery.html',
    styleUrls: ['./delivery.component.css']

})
export class AddDeliveryComponent implements OnInit {

    constructor(private appService: AppService) { }
    contact;
    email;
    password;
    phone;
    ngOnInit() {
    }
    addDelivory() {
        var data = {
            "first_name": this.contact,
            'email': this.email,
            'image': this.strImage,
            'password': this.password,
            'phone': this.phone
        }
        this.appService.addDeliveryUrl(data).subscribe(res => {
            swal(res.json().message);
        }, error => {

        })
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

}
