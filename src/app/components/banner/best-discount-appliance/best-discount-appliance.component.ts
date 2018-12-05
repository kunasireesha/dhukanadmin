import { AppService } from './../../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

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
    constructor(private AppService: AppService, public router: Router) { }

    ngOnInit() {
        this.getBanners();
    }
    getBanners() {
        this.AppService.getBannerUrl().subscribe(resp => {
            if (resp.json().status === 200) {
                this.banner = resp.json().result[6].banner;
                this.mainBannerId = resp.json().result[6].id;
                for (var i = 0; i < this.banner.length; i++) {
                    this.mobileBanner = this.banner[0].mobile_bannerimage;
                    this.websiteBanner = this.banner[0].website_bannerimage;
                }

            }

        })
    }
    deleteBanner(id) {
        var data = {
            'id': id
        }
        this.AppService.deleteBanner(data).subscribe(resp => {
            swal('banner deleted successfully', '', 'success');
            // this.getBanners();
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
