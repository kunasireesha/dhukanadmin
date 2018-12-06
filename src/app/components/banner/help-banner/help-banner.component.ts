import { AppService } from './../../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-help-banner',
    templateUrl: './help-banner.component.html',
    styleUrls: ['./help-banner.component.css']
})
export class HelpBannerComponent implements OnInit {
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
                this.banner = resp.json().result[7].banner;
                this.mainBannerId = resp.json().result[7].id;
                for (var i = 0; i < this.banner.length; i++) {
                    this.mobileBanner = this.banner[0].mobile_bannerimage;
                    this.websiteBanner = this.banner[0].website_bannerimage;
                }

            }

            // for (var i = 0; i < this.banner.length; i++) {
            //     for (var j = 0; j < this.banner[i].mobile_banner.length; j++) {
            //         this.banner[i].image = this.banner[i].mobile_banner[0].image_path;
            //         console.log(this.image);
            //     }
            // }
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
    editBanner(id) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                bannerId: id,
                mainId: this.mainBannerId
            }
        }
        this.router.navigate(['/addhelpBanners'], navigationExtras);
    }
    addBanner(id) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                bannerId: id
            }
        }
        this.router.navigate(['/addhelpBanners'], navigationExtras);
    }



}
