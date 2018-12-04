import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'add-users',
    templateUrl: './add.banner.html',
    styleUrls: ['./banner.component.css']
})
export class AddBannerComponent implements OnInit {
    bannerId
    type: any;
    selectedImage: any;
    selectedImage1: any;
    addbanners: boolean;
    title: any;
    mobile_banner;
    website_banner;
    skusData = [];
    skuValues = {
        name: '',
        type: '',
        mobile_banner: this.mobile_banner,
        website_banner: this.website_banner,

    }
    // bannerId= 
    constructor(private AppService: AppService, private route: ActivatedRoute, public router: Router) {
        this.route.queryParams.subscribe(params => {
            this.bannerId = params.bannerId
        })
        if (this.bannerId === '') {
            // this.removeImg = false;
            this.addbanners = true;

        } else {
            // this.Image = true;
            // this.removeImg = true;
            this.addbanners = false;
            // this.addbanners = this.action;

        }
    }

    ngOnInit() {
        // this.editbannerById();
    }

    sku() {
        this.skusData.push({
            name: '',
            type: '',
            // skuImage: this.skuImg,
            mobile_banner: '',
            imageurl: '',
            website_banner: '',
            imageurl1: ''
        });

    }
    image;
    strImage;
    changeListener($event, index): void {
        this.readThis($event.target, index);
    }

    readThis(inputValue: any, index): void {
        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.image = myReader.result;
            this.strImage = this.image.split(',')[1];
            for (var i = 0; i < this.skusData.length; i++) {
                if (i === index) {
                    // this.skusData[i].image = myReader.result;
                    this.skusData[i].mobile_banner = this.strImage;
                    this.skusData[i].imageurl = this.image;
                }
            }
        }
        myReader.readAsDataURL(file);
    }
    image1;
    strImage1;
    changeListener1($event, index): void {
        this.readThis1($event.target, index);
    }

    readThis1(inputValue: any, index): void {
        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.image1 = myReader.result;
            this.strImage1 = this.image1.split(',')[1];
            for (var i = 0; i < this.skusData.length; i++) {
                if (i === index) {
                    // this.skusData[i].image = myReader.result;
                    this.skusData[i].website_banner = this.strImage1;
                    this.skusData[i].imageurl1 = this.image1;
                }
            }
        }
        myReader.readAsDataURL(file);
    }

    onChange(type) {
        this.type = type;
    }
    // updateImage(index) {
    //     this.selectedImage = index;
    // }
    // updateImage1(index) {
    //     this.selectedImage1 = index;
    // }
    // urls = [];
    // images = [];
    // img: any;
    // strimg: any;
    // onSelectFile(event) {
    //     if (event.target.files && event.target.files[0]) {
    //         var filesAmount = event.target.files.length;
    //         for (let i = 0; i < filesAmount; i++) {
    //             const fileReader: FileReader = new FileReader();
    //             fileReader.onload = (event) => {
    //                 if (this.bannerId !== '') {
    //                     if (this.selectedImage === undefined) {
    //                         this.img = fileReader.result;
    //                         this.strimg = this.img.split(',')[1];
    //                         this.mobile_banner.push({ 'mobile_image_id': '', 'image_path': fileReader.result });
    //                         this.images.push({ 'mobile_image_id': '', 'uri': this.strimg })
    //                     } else {
    //                         this.img = fileReader.result;
    //                         this.strimg = this.img.split(',')[1];
    //                         for (var i = 0; i < this.mobile_banner.length; i++) {
    //                             if (this.mobile_banner[i].mobile_image_id === this.selectedImage) {
    //                                 this.mobile_banner.splice(i, 1);
    //                             }
    //                         }
    //                         this.mobile_banner.push({ 'mobile_image_id': this.selectedImage, 'image_path': fileReader.result })

    //                         this.images.push({ 'mobile_image_id': this.selectedImage, 'uri': this.strimg })
    //                         console.log(this.mobile_banner);
    //                     }
    //                 }
    //                 else {
    //                     this.img = fileReader.result;
    //                     this.strimg = this.img.split(',')[1]
    //                     this.urls.push(fileReader.result);
    //                     this.images.push(this.strimg);
    //                 }

    //             }

    //             fileReader.readAsDataURL(event.target.files[i]);
    //         }
    //     }
    // }
    // urls1 = [];
    // images1 = [];
    // img1: any;
    // strimg1: any;
    // onSelectFile1(event) {
    //     if (event.target.files && event.target.files[0]) {
    //         var filesAmount = event.target.files.length;
    //         for (let i = 0; i < filesAmount; i++) {
    //             const fileReader: FileReader = new FileReader();


    //             fileReader.onload = (event) => {
    //                 if (this.bannerId !== '') {
    //                     if (this.selectedImage1 === undefined) {
    //                         this.img = fileReader.result;
    //                         this.strimg = this.img.split(',')[1];
    //                         this.website_banner.push({ 'web_image_id': '', 'image_path': fileReader.result });
    //                         this.images1.push({ 'web_image_id': '', 'uri': this.strimg })
    //                     } else {
    //                         this.img = fileReader.result;
    //                         this.strimg = this.img.split(',')[1];
    //                         for (var i = 0; i < this.website_banner.length; i++) {
    //                             if (this.website_banner[i].web_image_id === this.selectedImage1) {
    //                                 this.website_banner.splice(i, 1);
    //                             }
    //                         }

    //                         this.images1.push({ 'web_image_id': this.selectedImage1, 'uri': this.strimg })
    //                         console.log(this.website_banner);
    //                     }
    //                 }
    //                 else {
    //                     this.img1 = fileReader.result;
    //                     this.strimg1 = this.img1.split(',')[1]
    //                     this.urls1.push(fileReader.result);
    //                     this.images1.push(this.strimg1);
    //                 }



    //             }


    //             fileReader.readAsDataURL(event.target.files[i]);
    //         }
    //     }
    // }
    // addbanner() {
    //     var data = {
    //         'title': this.title,
    //         'type': this.type,
    //         'website_banner': this.images1,
    //         'mobile_banner': this.images
    //     }
    //     this.AppService.postBannerUrl(data).subscribe(resp => {
    //         if (resp.json().status === 200) {
    //             swal('banner added successfully', '', 'success');
    //             this.router.navigate(['/banner']);
    //         }
    //         else if (resp.json().status === 400) {
    //             swal(resp.json().message, '', 'error');
    //         }
    //         else {

    //         }
    //     })
    // }
    deleteSku(index) {
        this.skusData.splice(index, 1);
    }
    addbanner() {
        var data = {
            'title': this.title,
            'banners': this.skusData

        }
        this.AppService.postBannerUrl(data).subscribe(resp => {
            if (resp.json().status === 200) {
                swal('banner added successfully', '', 'success');
                this.router.navigate(['/banner']);
            }
            else if (resp.json().status === 400) {
                swal(resp.json().message, '', 'error');
            }
        })
    }
    // bannerDetails;
    // mobile_banner = [];
    // website_banner = [];
    // editbannerById() {
    //     this.AppService.editBannerbyId(this.bannerId).subscribe(resp => {
    //         this.bannerDetails = resp.json();
    //         this.mobile_banner = this.bannerDetails[0].mobile_banner;
    //         this.website_banner = this.bannerDetails[0].website_banner;

    //     })
    // }
    // updateBanner() {
    //     var data = {
    //         'type': this.type,
    //         'website_banner': this.images1,
    //         'mobile_banner': this.images
    //     }
    //     this.AppService.updateBannerbyId(data, this.bannerId).subscribe(resp => {
    //         if (resp.json().status === 200) {
    //             swal('banner added successfully', '', 'success');
    //             this.router.navigate(['/banner']);
    //         }
    //         else if (resp.json().status === 400) {
    //             swal(resp.json().message, '', 'error');
    //         }
    //         else {

    //         }
    //     })
    // }

}