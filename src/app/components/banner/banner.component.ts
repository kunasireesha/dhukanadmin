import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
    banner: any;
    bannerImg = [];
    constructor(private AppService: AppService) { }

    ngOnInit() {
        this.getBanners();
    }
    getBanners() {
        this.AppService.getBannerUrl().subscribe(resp => {
            this.banner = resp.json().result.TOP1;
            for (var i = 0; i < this.banner.length; i++) {
                this.banner[i].images = JSON.parse(this.banner[i].mobile_banner);
                // this.bannerImg = this.banner[i].mobile_banner;

            }
        })
    }


}
