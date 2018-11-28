import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'add-users',
    templateUrl: './add.banner.html',
    styleUrls: ['./banner.component.css']
})
export class AddBannerComponent implements OnInit {

    type: any;
    constructor(private AppService: AppService) { }

    ngOnInit() {
    }
    onChange(type) {
        this.type = type
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
    addbanner() {
        var data = {
            'type': this.type,
            'website_banner': this.images1,
            'mobile_banner': this.images
        }
        this.AppService.postBannerUrl(data).subscribe(resp => {
        })
    }

}
