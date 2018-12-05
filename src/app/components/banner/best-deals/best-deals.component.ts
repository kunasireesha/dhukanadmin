import { AppService } from './../../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-best-deals',
    templateUrl: './best-deals.component.html',
    styleUrls: ['./best-deals.component.css']
})
export class BestDealsComponent implements OnInit {
    banner: any;
    bannerImg = [];
    mobileBanner;
    websiteBanner;
    image;
    constructor(private AppService: AppService, public router: Router) { }

    ngOnInit() {
        this.getBanners();
    }
    addBanner(id) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                bannerId: id
            }
        }
        this.router.navigate(['/addbestDeals'], navigationExtras);
    }
    editBanner(id) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                bannerId: id,
                mainId: this.mainBannerId
            }
        }
        this.router.navigate(['/addbestDeals'], navigationExtras);
    }
    mainBannerId
    getBanners() {
        this.AppService.getBannerUrl().subscribe(resp => {
            if (resp.json().status === 200) {
                this.banner = resp.json().result[1].banner;
                this.mainBannerId = resp.json().result[1].id;
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
            this.getBanners();
        })
    }

    // getDealsBanners() {
    //     this.AppService.getBannerUrl().subscribe(resp => {
    //         this.banner = resp.json().result.TOP1;
    //     })
    // }
    // deleteBestDealBanner(i) {
    //     this.AppService.deleteBanner(i).subscribe(resp => {
    //         swal('banner deleted successfully', '', 'success');
    //         this.getBanners();
    //     })
    // }
    // editBestDealBanner(id) {
    //     let navigationExtras: NavigationExtras = {
    //         queryParams: {
    //             dealbannerId: id
    //         }
    //     }
    //     this.router.navigate(['/addbanner'], navigationExtras);
    // }

}
