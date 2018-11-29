import { AppService } from './../../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-deals',
    templateUrl: './add.deal.html',
    styleUrls: ['./best-deals.component.css']
})
export class addDealsComponent implements OnInit {

    constructor(private AppService: AppService, private route: ActivatedRoute, public router: Router) {
        this.route.queryParams.subscribe(params => {
            // this.dealId = params.dealbannerId
        })
    }

    ngOnInit() {
    }
    onChange(type) {
        // this.type = type;

    }
    urls = [];
    images = [];
    img: any;
    strimg: any;
    onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                const fileReader: FileReader = new FileReader();

                fileReader.onload = (event) => {
                    this.img = fileReader.result;
                    this.strimg = this.img.split(',')[1]
                    this.urls.push(fileReader.result);
                    this.images.push(this.strimg);
                    console.log(this.images);
                }

                fileReader.readAsDataURL(event.target.files[i]);
            }
        }
    }
    urls1 = [];
    images1 = [];
    img1: any;
    strimg1: any;
    onSelectFile1(event) {
        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                const fileReader: FileReader = new FileReader();

                fileReader.onload = (event) => {
                    this.img1 = fileReader.result;
                    this.strimg1 = this.img1.split(',')[1]
                    this.urls1.push(fileReader.result);
                    this.images1.push(this.strimg1);
                    console.log(this.images1);
                }

                fileReader.readAsDataURL(event.target.files[i]);
            }
        }
    }
    // addDealBanner() {
    //     var data = {
    //         'type': this.type,
    //         'website_banner': this.images1,
    //         'mobile_banner': this.images
    //     }
    //     this.AppService.postBannerUrl(data).subscribe(resp => {
    //         if (resp.json().status === 200) {
    //             swal('banner added successfully', '', 'success');
    //             this.router.navigate(['/banner']);
    //         }
    //         else {
    //             swal(resp.json().message, '', 'success');
    //         }
    //     })
    // }
    // updateDealBanners() {
    //     this.AppService.updateBanner(this.dealId).subscribe(resp => {

    //     })
    // }

}
