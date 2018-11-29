import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
    banner: any;
    bannerImg = [];
    image;
    constructor(private AppService: AppService, public router: Router) { }

    ngOnInit() {
        this.getBanners();
    }
    getBanners() {
        this.AppService.getBannerUrl().subscribe(resp => {
            this.banner = resp.json().result.TOP1;
            // for (var i = 0; i < this.banner.length; i++) {
            //     for (var j = 0; j < this.banner[i].mobile_banner.length; j++) {
            //         this.banner[i].image = this.banner[i].mobile_banner[0].image_path;
            //         console.log(this.image);
            //     }
            // }
        })
    }
    deleteBanner(i) {
        this.AppService.deleteBanner(i).subscribe(resp => {
            swal('banner deleted successfully', '', 'success');
            this.getBanners();
        })
    }
    editBanner(id) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                bannerId: id
            }
        }
        this.router.navigate(['/addbanner'], navigationExtras);
    }
    addBanner(id) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                bannerId: id
            }
        }
        this.router.navigate(['/addbanner'], navigationExtras);
    }

}
