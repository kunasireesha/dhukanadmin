import { AppService } from './../../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-best-discount-appliance',
    templateUrl: './best-discount-appliance.component.html',
    styleUrls: ['./best-discount-appliance.component.css']
})
export class BestDiscountApplianceComponent implements OnInit {
    banner: any;
    bannerImg = [];
    mobileBanner;
    websiteBanner;
    image;
    mainBannerId;
    constructor(private AppService: AppService, public router: Router, private spinnerService: Ng4LoadingSpinnerService) { }

    ngOnInit() {
        this.getBanners();
    }
    getBanners() {
        this.spinnerService.show();
        this.AppService.getBannerUrl().subscribe(resp => {
            if (resp.json().status === 200) {
                this.spinnerService.hide();
                this.banner = resp.json().result[4].banner;
                this.mainBannerId = resp.json().result[4].id;
                for (var i = 0; i < this.banner.length; i++) {
                    this.mobileBanner = this.banner[0].mobile_bannerimage;
                    this.websiteBanner = this.banner[0].website_bannerimage;
                }

            }

        })
    }
    deleteBanner(id) {
        this.spinnerService.show();
        var data = {
            'id': id
        }
        this.AppService.deleteBanner(data).subscribe(resp => {
            this.spinnerService.hide();
            swal('banner deleted successfully', '', 'success');
            this.getBanners();
        })
    }
    editBanner(id) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                bannerId: id,
                mainId: this.mainBannerId
            }
        }
        this.router.navigate(['/addDiscountAppliances'], navigationExtras);
    }
    addBanner(id) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                bannerId: id
            }
        }
        this.router.navigate(['/addDiscountAppliances'], navigationExtras);
    }

}
