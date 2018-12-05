import { AppService } from './../../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'add-users',
    templateUrl: './add.discount.html',
    styleUrls: ['./best-discount.component.css']
})
export class AddBestDiscountComponent implements OnInit {
    mainId;
    bannerId;
    categorydata;
    category = false;
    subcategory = false;
    product = false;
    skus = false;
    brand = false;
    type: any;
    selectedImage: any;
    selectedImage1: any;
    addbanners: boolean;
    title: any;
    mobile_banner;
    website_banner;
    skusData = [];
    productData = [];
    subCategoryName = [];
    catName = [];
    catId = [];
    subCatId = [];
    prodId = [];
    constructor(private AppService: AppService, private route: ActivatedRoute, public router: Router) {
        this.route.queryParams.subscribe(params => {
            this.bannerId = params.bannerId
            this.mainId = params.mainId
        })
        if (this.bannerId === '') {
            // this.removeImg = false;
            this.addbanners = true;

        } else {
            // this.Image = true;
            // this.removeImg = true;
            this.addbanners = false;
            this.editbannerById();
            // this.addbanners = this.action;

        }
    }

    ngOnInit() {
        this.getCat();
        this.getProduct();
        this.getSubCategory();
    }
    sku() {
        this.catName = [];
        this.skusData.push({
            name: '',
            type: '',
            // skuImage: this.skuImg,
            mobile_banner: '',
            mobile_bannerimage: '',
            website_banner: '',
            website_bannerimage: '',
            target: '',
            catNames: ''
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
                    this.skusData[i].mobile_bannerimage = this.image;
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
                    this.skusData[i].website_bannerimage = this.image1;
                }
            }
        }
        myReader.readAsDataURL(file);
    }
    onChange(type, index) {
        this.type = type;
        for (var i = 0; i < this.skusData.length; i++) {
            if (i === index) {
                if (this.type === 'Categories') {
                    this.skusData[i].category = true;
                    this.skusData[i].subcategory = false;
                    this.skusData[i].product = false;
                    this.skusData[i].brand = false;
                    this.skusData[i].skus = false;
                } else if (this.type === 'Subcategories') {
                    this.skusData[i].subcategory = true;
                    this.skusData[i].category = false;
                    this.skusData[i].product = false;
                    this.skusData[i].brand = false;
                    this.skusData[i].skus = false;
                } else if (this.type === 'Product') {
                    this.skusData[i].subcategory = false;
                    this.skusData[i].category = false;
                    this.skusData[i].product = true;
                    this.skusData[i].skus = false;
                    this.skusData[i].brand = false;
                } else if (this.type === 'sku') {
                    this.skusData[i].subcategory = false;
                    this.skusData[i].category = false;
                    this.skusData[i].product = false;
                    this.skusData[i].brand = false;
                    this.skusData[i].skus = true;
                } else if (this.type === 'Brand') {
                    this.skusData[i].subcategory = false;
                    this.skusData[i].category = false;
                    this.skusData[i].product = false;
                    this.skusData[i].skus = false;
                    this.skusData[i].brand = true;
                }
                return;
            }
        }


    }
    getCat() {
        this.AppService.getCat()
            .subscribe(resp => {
                if (resp.json().message === 'Success') {
                    this.categorydata = resp.json().result;
                }
                else {

                }
            },
                error => {
                    console.log(error, "error");
                })
    }
    getSubCategory() {
        this.AppService.getSubCategery().subscribe(resp => {
            this.subCategoryName = resp.json().result;
            // for (var i = 0; i < this.subCategoryName.length; i++) {
            //     this.subCategoryId = this.subCategoryName[i].sub_cat_id;
            // }

        },
            error => {
                console.log(error, "error");
            })
    }
    getProduct() {
        // let goodResponse = [];
        this.AppService.getProduct()
            .subscribe(resp => {
                this.productData = resp.json().result;

            })

        error => {
            console.log(error, "error");
        }
    }
    changeCat(id, index, action) {

        if (action === 'cat') {
            for (var i = 0; i < this.categorydata.length; i++) {
                if (this.categorydata[i].id === parseInt(id)) {
                    this.catName.push(this.categorydata[i].name);
                    this.catId.push(this.categorydata[i].id);

                    for (var i = 0; i < this.skusData.length; i++) {
                        // this.skusData[i].image = myReader.result;
                        if (i === index) {
                            this.skusData[i].target = this.catId.join(',');
                            this.skusData[i].catNames = this.catName.join(',');
                        }
                    }
                    return;
                }
            }
        } else if (action === 'subcat') {
            for (var i = 0; i < this.subCategoryName.length; i++) {
                if (this.subCategoryName[i].sub_cat_id === parseInt(id)) {
                    this.catName.push(this.subCategoryName[i].sub_cat);
                    this.subCatId.push(this.subCategoryName[i].sub_cat_id);

                    for (var i = 0; i < this.skusData.length; i++) {
                        // this.skusData[i].image = myReader.result;
                        if (i === index) {
                            this.skusData[i].target = this.subCatId.join(',');
                            this.skusData[i].catNames = this.catName.join(',');
                        }
                    }
                    return;
                }
            }
        }
        else if (action === 'prod') {
            for (var i = 0; i < this.productData.length; i++) {
                if (this.productData[i].id === parseInt(id)) {
                    this.catName.push(this.productData[i].title);
                    this.prodId.push(this.productData[i].id);

                    for (var i = 0; i < this.skusData.length; i++) {
                        // this.skusData[i].image = myReader.result;
                        if (i === index) {
                            this.skusData[i].target = this.prodId.join(',');
                            this.skusData[i].catNames = this.catName.join(',');
                        }
                    }
                    return;
                }
            }
        }

    }
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
                this.router.navigate(['/bestDiscount']);
            }
            else if (resp.json().status === 400) {
                swal(resp.json().message, '', 'error');
            }
        })
    }
    bannerDetails;
    skuValues;
    // name;
    // mobile_banner = [];
    // website_banner = [];
    editbannerById() {
        var data = {
            'id': this.bannerId
        }
        this.AppService.editBannerbyId(data).subscribe(resp => {
            this.skusData = resp.json().result;
            this.image = true;
            for (var i = 0; i < this.skusData.length; i++) {
                if (this.skusData[i].type === 'Categories') {
                    this.skusData[i].category = true;
                    this.catId.push(this.skusData[i].target);

                    // this.skusData[i].catNames=
                } else if (this.skusData[i].type === 'Subcategories') {
                    this.skusData[i].subcategory = true;
                    this.subCatId.push(this.skusData[i].target);
                } else if (this.skusData[i].type === 'Product') {
                    this.skusData[i].product = true;
                    this.prodId.push(this.skusData[i].target);
                }
            }

            console.log(this.skusData);
            // this.skuValues = {
            //     name: this.bannerDetails.name
            // }
            // console.log(this.skuValues.name);
        })
    }
    updateBanner() {
        var data = {
            'id': this.mainId
        }
        this.AppService.updateBannerbyId(data).subscribe(resp => {
            if (resp.json().status === 200) {
                swal('banner added successfully', '', 'success');
                this.router.navigate(['/bestDiscount']);
            }
            else if (resp.json().status === 400) {
                swal(resp.json().message, '', 'error');
            }
            else {

            }
        })
    }

}
