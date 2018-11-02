import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/productService'
import { IMyDpOptions } from 'mydatepicker';
import { Router, NavigationExtras } from '@angular/router';
@Component({
    selector: 'add-products',
    templateUrl: './add.product.html',
    styleUrls: ['./products.component.css']
})
export class AddProductsComponent implements OnInit {
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };
    public model: any = { date: { year: 2018, month: 10, day: 9 } };
    // id;
    // title;
    // catId;
    // url = '';
    addProd: boolean
    // selectedFile: File;
    data: any;
    category;
    categoryId;
    proName;
    categoryName;
    // input;
    productId;
    action;
    subCategory: any;
    caId;
    cateGoryId;
    strImage;
    subCatName;
    // subCat;
    subCatId;
    subCateId;
    productDetails;
    // strImge;
    img;
    urls = [];
    imagenum;
    images = [];
    Productimages = [];
    selectedImage;
    textarea;
    mrp;
    offer;
    Manufacture;
    subcatId;
    size;
    quantity;
    constructor(private appService: AppService, private route: ActivatedRoute, public proserv: ProductService, public router: Router) {
        this.route.queryParams.subscribe(params => {
            this.action = params.prodId;
        });

        if (this.action === '') {
            this.addProd = true;
        } else {
            this.addProd = false;
            this.productId = this.action;
        }


    }

    ngOnInit() {

        if (this.action !== '') {
            this.editProImages();
        }

        this.getCat();
        this.getSubCategory();
        // this.getProduct();

    }
    subCategoryName;
    changeCat(id) {
        // this.categoryId = id;
        for (var i = 0; i < this.category.length; i++) {
            if (id === this.category[i].name) {
                this.caId = this.category[i].id
            }
        }
        var data = {
            'cat_id': this.caId
        }
        this.appService.getSubCat(data).subscribe(resp => {
            this.subCategoryName = resp.json().data;

        })
    }
    changeSubCat(id) {

        // this.subcatId = id;
        for (var i = 0; i < this.subCategoryName.length; i++) {
            if (id === this.subCategoryName[i].sub_cat) {
                this.subCatId = this.subCategoryName[i].id;
            }
        }
    }


    //add product
    getCat() {
        this.appService.getCat()
            .subscribe(resp => {
                if (resp.json().message === 'Success') {
                    this.category = resp.json().result;
                    console.log(this.category);
                }
                else {

                }
            },
                error => {
                    console.log(error, "error");
                })
    }

    updateProduct() {
        console.log(this.images);
        var data = {
            'category_id': (this.caId === undefined) ? this.categoryId : this.caId,
            'title': this.proName,
            'id': this.productId,
            'subcategory_id': (this.subCatId === undefined) ? this.subCateId : this.subCatId,
            'image': this.images,
            "sku": this.size,
            "description": this.textarea,
            "actual_price": this.mrp,
            "offer_price": this.offer,
            "manufacture_name": this.Manufacture
        }
        this.appService.updateProduct(data)
            .subscribe(resp => {
                if (resp.json().message === 'Success') {
                    this.category = resp.json().result;
                    swal('update product successfully', '', 'success')
                    this.router.navigate(['/prducts']);
                }
                else {
                }
            },
                error => {
                    console.log(error, "error");
                })
    }
    getSubCategory() {
        this.appService.getSubCategery().subscribe(resp => {
            this.subCategoryName = resp.json().result;

        },
            error => {
                console.log(error, "error");
            })
    }

    imagesData = [];
    lastIndex;
    replace;

    // onSelectFile(event) {
    //     this.images = [];
    //     if (event.target.files && event.target.files[0]) {
    //         var filesAmount = event.target.files.length;
    //         for (let i = 0; i < filesAmount; i++) {
    //             const fileReader: FileReader = new FileReader();
    //             fileReader.onload = (event) => {
    //                 if (this.selectedImage === '' || this.selectedImage === undefined || this.selectedImage === null) {
    //                     if (this.imagesData.length !== 0) {
    //                         this.lastIndex = this.imagesData[this.imagesData.length - 1]
    //                         this.imagenum = parseInt(this.lastIndex.key) + 1;
    //                         this.imagesData.push({ 'key': this.imagenum });
    //                         this.productImg.push({ 'image': fileReader.result, 'key': this.imagenum });

    //                     } else {
    //                         this.imagenum = this.urls.push(fileReader.result);
    //                     }
    //                 } else {
    //                     this.imagenum = this.selectedImage;
    //                     for (var i = 0; i < this.productImg.length; i++) {
    //                         if (this.productImg[i].key === this.imagenum) {
    //                             this.productImg.splice(i, 1)
    //                         }
    //                     }
    //                     this.productImg.push({ 'image': fileReader.result, 'key': this.imagenum });
    //                 }
    //                 this.img = fileReader.result;
    //                 this.strImage = this.img.split(',')[1];
    //                 this.images.push({ image_no: this.imagenum, image_data: this.strImage });
    //             }
    //             fileReader.readAsDataURL(event.target.files[i]);
    //         }
    //     }
    // }

    onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                const fileReader: FileReader = new FileReader();
                fileReader.onload = (event) => {
                    if (this.selectedImage === '' || this.selectedImage === undefined || this.selectedImage === null) {
                        this.imagenum = this.urls.push(fileReader.result);
                        console.log(this.imagenum);
                    } else {
                        this.imagenum = this.selectedImage.toString();
                    }
                    this.img = fileReader.result;
                    this.strImage = this.img.split(',')[1];
                    this.images.push(this.strImage);
                    console.log(this.images);

                }
                fileReader.readAsDataURL(event.target.files[i]);
            }
        }
    }

    insertProduct() {
        var data = {
            'id': this.productId,
            'title': this.proName,
            'category_id': this.caId,
            'image': this.images,
            'subcategory_id': (this.subCatId === undefined) ? this.subCateId : this.subCatId,
            'description': this.textarea,
            'sku': this.size,
            'actual_price': this.mrp,
            'offer_price': this.offer,
            'manufacture_name': this.Manufacture,
            'quantity': this.quantity
        }
        this.appService.insertProduct(data)
            .subscribe(resp => {
                if (resp.json().message === 'Success') {
                    this.data = resp.json().result;
                    swal('product added successfully', '', 'success');
                    this.router.navigate(['/prducts']);
                }
            },
                error => {
                    console.log(error, "error");
                })
    }
    productImg = [];

    editProImages() {
        var data = {
            'id': this.productId
        }
        this.appService.editproductImg(data).subscribe(resp => {
            this.productDetails = resp.json().products;
            this.proName = this.productDetails[0].title;
            this.categoryId = this.productDetails[0].category_id;
            this.categoryName = this.productDetails[0].category1;
            this.productId = this.productDetails[0].id;
            this.subCatName = this.productDetails[0].category2;
            this.subCateId = this.productDetails[0].category2_id;
            this.Productimages = JSON.parse(this.productDetails[0].product_image);
            for (var i = 0; i < this.Productimages.length; i++) {
                this.Productimages[i].image = Object.values(this.Productimages[i]);
                this.Productimages[i].keyValue = Object.keys(this.Productimages[i]);
                this.productImg.push({ 'image': this.Productimages[i].image[0], 'key': this.Productimages[i].keyValue[0] });
                this.imagesData.push({ 'image': this.Productimages[i].image[0], 'key': this.Productimages[i].keyValue[0] });
            }
        })
    }

    updateImage(index) {
        this.selectedImage = index;
    }
}
