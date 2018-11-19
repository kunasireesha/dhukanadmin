import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
@Component({
    selector: 'add-vendors',
    templateUrl: './add.vendor.html',
    styleUrls: ['./vendors.component.css']
})
export class AddVendorsComponent implements OnInit {
    strImage: any;
    contact;
    business;
    email;
    password;
    phone;
    vendorId;
    vendors: any;
    constructor(private appService: AppService, private route: ActivatedRoute, public router: Router) {
        this.route.queryParams.subscribe(params => {
            this.vendorId = params.vendorId
        });
    }

    ngOnInit() {
        this.getVendorsbyId();
    }
    image;

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
    getVendorsbyId() {
        this.appService.getVendorsbyId(this.vendorId).subscribe(resp => {
            this.vendors = resp.json().data;
            this.contact = this.vendors[0].first_name;
            this.business = this.vendors[0].business_name;
            this.email = this.vendors[0].email;
            this.phone = this.vendors[0].phone;

        })
    }
    updateVendorbyId() {
        var data = {
            'first_name': this.contact,
            'business_name': this.business,
            'phone': this.phone,
            'email': this.email,
            'image': this.strImage
        }
        this.appService.updateVendorbyId(this.vendorId, data).subscribe(resp => {
            if (resp.json().status === 200) {
                swal('update vendor successfully', '', 'success');
                this.router.navigate(['/vendors']);
            }
        })
    }
}
