import { AppService } from './../../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-best-deals',
    templateUrl: './best-deals.component.html',
    styleUrls: ['./best-deals.component.css']
})
export class BestDealsComponent implements OnInit {

    constructor(private AppService: AppService, public router: Router) { }

    ngOnInit() {
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
