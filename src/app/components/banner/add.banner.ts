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
        this.editbannerById();
    }
    onChange(type) {
        this.type = type;
    }
    updateImage(index) {
        this.selectedImage = index;
    }
    updateImage1(index) {
        this.selectedImage1 = index;
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
                    if (this.bannerId !== '') {
                        if (this.selectedImage === undefined) {
                            this.img = fileReader.result;
                            this.strimg = this.img.split(',')[1];
                            // this.productDetails[0].myImages.push({ 'id': '', 'product_image': fileReader.result });
                            this.images.push({ 'image_no': '', 'image_data': this.strimg })
                        } else {
                            this.img = fileReader.result;
                            this.strimg = this.img.split(',')[1];
                            // for (var i = 0; i < this.productDetails[0].myImages.length; i++) {
                            //     if (this.productDetails[0].myImages[i].id === this.selectedImage) {
                            //         this.productDetails[0].myImages.splice(i, 1)
                            //     }
                            // }
                            // this.productDetails[0].myImages.push({ 'id': this.selectedImage, 'product_image': fileReader.result });
                            this.images.push({ 'image_no': this.selectedImage, 'image_data': this.strimg })
                        }
                    }
                    else {
                        this.img = fileReader.result;
                        this.strimg = this.img.split(',')[1]
                        this.urls.push(fileReader.result);
                        this.images.push(this.strimg);
                        console.log(this.images);
                    }

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
    addbanner() {
        debugger
        var data = {
            'type': this.type,
            'website_banner': this.images1,
            'mobile_banner': this.images
        }
        this.AppService.postBannerUrl(data).subscribe(resp => {
            if (resp.json().status === 200) {
                swal('banner added successfully', '', 'success');
                this.router.navigate(['/banner']);
            }
            else {
                swal(resp.json().message, '', 'success');
            }
        })
    }
    editbannerById() {
        this.AppService.updateBanner(this.bannerId).subscribe(resp => {

        })
    }

}
