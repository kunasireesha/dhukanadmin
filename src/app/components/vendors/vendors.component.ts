import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-vendors',
    templateUrl: './vendors.component.html',
    styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
    vendors;
    constructor(private appService: AppService, public router: Router) { }

    ngOnInit() {
        this.getVendors();
    }
    getVendors() {
        this.appService.getVendors().subscribe(resp => {
            this.vendors = resp.json().data;

        })
    }
    // getVendorsbyId(id) {
    //     this.appService.getVendorsbyId(id).subscribe(resp => {

    //     })
    // }
    editVendor(id) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                vendorId: id
            }
        }
        this.router.navigate(['/addvendors'], navigationExtras);
    }
    deleteVendor(id) {
        this.appService.deleteVendorbyId(id).subscribe(resp => {
            this.getVendors();
        })
    }
}
