import { LoginComponent } from './../login/login.component';
import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/productService'
import { IMyDpOptions } from 'mydatepicker';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'underscore';

@Component({
    selector: 'add-products',
    templateUrl: './add.product.html',
    styleUrls: ['./products.component.css']
})
export class AddProductsComponent implements OnInit {
    form: FormGroup;

    text: string;
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };
    public model: any = { date: { year: 2018, month: 10, day: 9 } };
    type;
    subcategoryName;
    addProd: boolean;
    removeImg: boolean = false;
    Image: boolean;
    amount: boolean;
    percentage: boolean;
    data: any;
    category;
    categoryId;
    proName;
    categoryName;
    productId;
    action;
    subCategory: any;
    caId;
    cateGoryId;
    strImage;
    subCatName;
    subCatId;
    subCateId;
    productDetails = [];
    img;
    urls = [];
    imagenum;
    images = [];
    Productimages = [];
    selectedImage;
    imgSku;
    Description;
    specification;
    terms;
    faq;
    mrp;
    skuImg = '';
    skuImage;
    vegImage
    skusData = [];
    locationData = [];
    skuValues = {
        size: '',
        quantity: '',
        mrp: '',
        offer: '',
        sellingPrice: '',
        stock: '',
        skuImage: this.skuImg,
        quality_image: this.vegImage,
        image: this.type,
        country: '',
        state: '',
        city: '',
        area: '',
        Description: '',
        specification: '',
        terms: '',
        faq: '',
        answer: ''
    }
    offer;
    Manufacture;
    subcatId;
    size;
    quantity: string;
    brand;
    brandid;
    actualPrice;
    sellingPrice;
    list: any[];
    disAmount;
    disPercentage;
    answer;
    isChecked;
    countryData = [];
    countrys = [];
    statesData = [];
    citysData = [];
    citys = [];
    areasData = [];
    areas = [];
    country;
    states = [];
    state;
    city;
    area;
    updatedSkus = [];
    skuImge;


    constructor(private appService: AppService, private route: ActivatedRoute, public proserv: ProductService, public router: Router, private fb: FormBuilder) {
        // this.form = this.fb.group({
        //     enable: false,
        //     text: [
        //         {
        //             value: null,
        //             disabled: true,
        //         },
        //     ],
        // });
        // this.updateText();
        this.route.queryParams.subscribe(params => {
            this.action = params.prodId;
        });

        if (this.action === '') {
            this.removeImg = false;
            this.addProd = true;

        } else {
            this.Image = true;
            // this.removeImg = true;
            this.addProd = false;
            this.productId = this.action;

        }
    }
    product: any;
    productSku = []
    productdetails = [];
    skuimages = [];
    cat_id;
    subCat_id;
    brand_id;
    getProduct() {
        this.skuimages = [];
        let goodResponse = [];
        this.appService.getProduct()
            .subscribe(resp => {
                // if (resp.json().message === 'Success') {
                this.product = resp.json().data.results;
                for (var i = 0; i < this.product.length; i++) {
                    if (this.action == this.product[i].id) {
                        this.categoryName = this.product[i].main_cat_name;
                        this.subcategoryName = this.product[i].sub_cat_name;
                        this.proName = this.product[i].title;
                        this.Manufacture = this.product[i].brand_name;
                        this.cat_id = this.product[i].category_id;
                        this.subCat_id = this.product[i].category2_id;
                        this.brand_id = this.product[i].brand_id;
                        this.skusData = this.product[i].sku;
                        for (var j = 0; j < this.skusData.length; j++) {
                            this.skusData[j].offer = this.skusData[j].offer_price;
                            this.skusData[j].sellingPrice = this.skusData[j].selling_price;
                            this.skusData[j].quantity = this.skusData[j].min_quantity;
                            this.skusData[j].image1 = this.skusData[j].quality_image;
                            this.skusData[j].Description = this.skusData[j].description;
                            this.skusData[j].terms = this.skusData[j].terms.data;
                            this.skusData[j].faq = this.skusData[j].faq.answer;
                            this.skusData[j].state = this.skusData[j].state;
                            this.skusData[j].city = this.skusData[j].city;
                            this.skusData[j].area = this.skusData[j].area;
                            this.skusData[j].answer = this.skusData[j].faq.answer;
                        }
                        return;
                    }
                }

                // for (var i = 0; i < this.product.length; i++) {
                //     for (var j = 0; j < this.product[i].myImages.length; j++) {
                //         this.product[i].image = this.product[i].myImages[0].product_image;

                //     }
                // }
                // for (var j = 0; j < this.image.length; i++) {
                //     this.productimg = this.image[i];
                //     console.log(this.productimg);
                // }
            })
        // else if (resp.json().result.length == 0) {
        //     swal("No data found, please add new one", '', 'error');
        // }
        // else {
        // }
        // },
        error => {
            console.log(error, "error");
        }
    }
    // private updateText() {
    //     this.text = this.form.value.enable ? "Vegetrian" : "NonVegetrian";
    // }

    // onChange(enable: boolean) {
    //     const field = this.form.get('text');
    //     if (enable) {
    //         field.enable();
    //     } else {
    //         field.disable();
    //     }
    //     this.updateText();
    // }

    optionsChecked = [];

    ngOnInit() {

        this.list = [
            {
                id: 1,
                title: 'Normal Delivery',
                checked: true,
            },
            {
                id: 2,
                title: 'Express Delivery',
                checked: false,
            }
        ]
        if (this.action !== '') {
            // this.editProImages();

        }

        this.getCat();
        this.getSubCategory();
        this.getProduct();

        this.getLocation();
        this.type = 'Vegetrian';
        console.log(this.skusData);

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
    changeSubCat(name) {
        for (var i = 0; i < this.subCategoryName.length; i++) {
            if (name === this.subCategoryName[i].sub_cat) {
                this.subCatId = this.subCategoryName[i].id;
                return;
            }
        }
    }

    changeSub(name) {
        for (var i = 0; i < this.subCategoryName.length; i++) {
            if (name === this.subCategoryName[i].sub_cat) {
                this.subCatId = this.subCategoryName[i].id;
                return;
            }
        }
    }
    // value = [];
    selectedExpressValue = false;
    selectedNormalValue = true;
    checkbox(evt: boolean, id, data, index) {
        this.isChecked = evt;
        for (var i = 0; i < this.list.length; i++) {
            if (this.isChecked) {
                if (this.list[i].id === id && data.title === 'Express Delivery') {
                    this.isChecked = evt;
                    this.selectedExpressValue = true;
                    this.selectedNormalValue = true;
                    for (var i = 0; i < this.skusData.length; i++) {
                        if (i === index) {
                            this.skusData[i].express_delivery = this.selectedExpressValue;
                            this.skusData[i].normal_delivery = this.selectedExpressValue;
                            return;

                        }
                    }
                    return;
                }
            } else {
                this.selectedExpressValue = false;
                this.selectedNormalValue = true;
                return;
            }
        }
    }


    //add product
    getCat() {
        this.appService.getCat()
            .subscribe(resp => {
                if (resp.json().message === 'Success') {
                    this.category = resp.json().result;
                }
                else {

                }
            },
                error => {
                    console.log(error, "error");
                })
    }


    subCategoryId: any;
    getSubCategory() {
        this.appService.getSubCategery().subscribe(resp => {
            this.subCategoryName = resp.json().result;
            for (var i = 0; i < this.subCategoryName.length; i++) {
                this.subCategoryId = this.subCategoryName[i].sub_cat_id;
            }

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
    newSkuData = [];
    onSelectFile(event, index) {
        // this.images = [];
        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                const fileReader: FileReader = new FileReader();
                fileReader.onload = (event) => {
                    this.skuImage = '';
                    if (this.action !== '') {
                        if (this.selectedImage === undefined) {
                            this.img = fileReader.result;
                            this.strImage = this.img.split(',')[1];
                            // this.productDetails[0].myImages.push({ 'id': '', 'product_image': fileReader.result });
                            // this.images.push({ 'image_no': '', 'image_data': this.strImage })

                            for (var i = 0; i < this.skusData.length; i++) {
                                if (i === index) {
                                    this.skusData[i].sku_images.push({
                                        "sku_image": this.img,
                                        "product_id": this.skusData[i].sku_images[0].product_id,
                                    })
                                    // for (var j = 0; j < this.skusData[i].sku_images.length; j++) {
                                    this.skusData[i].images = this.skusData[i].sku_images;
                                    // }
                                    this.newSkuData.push(this.skusData[i]);
                                    return;
                                }
                            }


                        } else {
                            this.img = fileReader.result;
                            this.strImage = this.img.split(',')[1];


                            for (var i = 0; i < this.skusData.length; i++) {
                                if (i === index) {
                                    this.newSkuData.push(this.skusData[i]);
                                }
                            }

                            for (var j = 0; j < this.newSkuData[0].sku_images.length; j++) {
                                if (this.selectedImage === this.newSkuData[0].sku_images[j].id) {
                                    this.newSkuData[0].sku_images.splice(j, 1);
                                }
                            }

                            this.newSkuData[0].sku_images.push({
                                'sku_image': this.img,
                                'id': this.selectedImage,
                                'sku_id': this.imgSku,
                                "product_id": this.newSkuData[0].product_id,
                                "sku_img_path": this.skuImge,
                                "new_image": this.strImage
                            })

                            console.log(this.newSkuData);


                            // for (var i = 0; i < this.skusData.length; i++) {
                            //     // this.skusData[i].sku_images.push()
                            //     for (var j = 0; j < this.skusData[i].sku_images.length; j++) {
                            //         if (this.selectedImage === this.skusData[i].sku_images[j].id) {
                            //             this.skusData[i].sku_images.splice(j, 1);
                            //             // this.skusData[i].sku_images[j].sku_image = fileReader.result;
                            //             //                                         this.skusData[i].sku_images.push({
                            //             //                                             "id": this.selectedImage,
                            //             //                                             "sku_id": this.skusData[i].sku_images[j].sku_id,
                            //             //                                             "sku_image": this.img,
                            //             //                                             "product_id": this.skusData[i].sku_images[j].product_id,
                            //             //                                         })
                            //             // j
                            //             //                                         if (this.skusData[i].sku_images[j].id === this.selectedImage) {
                            //             //                                             this.skusData[i].sku_images.splice(j, 1);
                            //             //                                         }



                            //             this.skusData[i].images.push({
                            //                 "id": this.selectedImage,
                            //                 "sku_id": this.skusData[i].sku_images[j].sku_id,
                            //                 "sku_image": this.strImage,
                            //                 "product_id": this.skusData[i].sku_images[j].product_id,
                            //                 "sku_img_path": this.skusData[i].sku_images[j].sku_image,
                            //             })

                            //             for (var k = 0; k < this.skusData[i].images.length; k++) {
                            //                 if (this.skusData[i].images[k].id === this.selectedImage) {
                            //                     this.skusData[i].images.splice(k, 1);
                            //                 }
                            //             }
                            //         }
                            //     }

                            //     this.skusData[i].sku_images.push({
                            //         "sku_image": this.img,
                            //         "id": this.selectedImage
                            //     })
                            // }

                            // for (var i = 0; i < this.productDetails[0].myImages.length; i++) {
                            //     if (this.productDetails[0].myImages[i].id === this.selectedImage) {
                            //         this.productDetails[0].myImages.splice(i, 1)
                            //     }
                            // }
                            // this.productDetails[0].myImages.push({ 'id': this.selectedImage, 'product_image': fileReader.result });
                            // this.images.push({ 'image_no': this.selectedImage, 'image_data': this.strImage })
                            // this.imagenum = this.urls.push(fileReader.result);
                        }
                    } else {

                        for (var i = 0; i < this.skusData.length; i++) {
                            if (i === index) {
                                this.img = fileReader.result;
                                this.strImage = this.img.split(',')[1];
                                this.urls.push({ sku_image: fileReader.result });
                                this.images.push(this.strImage);
                                // this.skusData[i].image = myReader.result;
                                this.skusData[i].skuImage = this.images;
                                this.skusData[i].sku_images = this.urls;
                                return;
                            }
                        }
                    }
                }
                fileReader.readAsDataURL(event.target.files[i]);
            }
        }


    }

    insertProduct() {
        for (var i = 0; i < this.skusData.length; i++) {
            this.skusData[i].quantity = this.skusData[i].quantity.toString();
            this.skusData[i].stock = this.skusData[i].stock.toString();
        }
        var data = {
            // 'id': this.productId,
            'title': this.proName,
            'category_id': this.caId,
            'brand_name': this.Manufacture,
            'subcategory_id': this.subCatId,
            'brand_id': 123,
            // 'country': this.country,
            // 'state': this.state,
            // 'city': this.city,
            // 'area': this.area,
            // 'image': this.images,

            // 'actual_price': this.actualPrice,
            // 'selling_price': this.sellingPrice,
            // 'quality_image': this.strImage,
            // 'discount_type': this.discountOption,
            // 'discount_percentage': this.disAmount,
            // 'express_delivery': this.selectedExpressValue,
            // 'normal_delivery': this.selectedNormalValue,
            // 'description': this.Description,
            // 'specification': this.specification,
            // 'terms': this.terms,

            'sku': this.skusData,
            // 'question': this.faq,
            // 'answer': this.answer,

        }
        // console.log(data);


        this.appService.insertProduct(data)
            .subscribe(resp => {
                if (resp.json().status === 200) {
                    swal('product added successfully', '', 'success');
                    this.router.navigate(['/prducts']);
                }
            },
                error => {
                    console.log(error, "error");
                })
    }
    productImg = [];
    // editProImages() {
    //     var data = {
    //         'id': this.productId
    //     }
    //     this.appService.editproductImg(data).subscribe(resp => {
    //         this.productDetails = resp.json().result;
    //         this.proName = this.productDetails[0].title;
    //         this.categoryId = this.productDetails[0].category_id;
    //         this.categoryName = this.productDetails[0].category1;
    //         this.productId = this.productDetails[0].id;
    //         this.subCatName = this.productDetails[0].category2;
    //         this.subCateId = this.productDetails[0].category2_id;
    //         this.Description = this.productDetails[0].description;
    //         this.terms = this.productDetails[0].terms_and_conditions;
    //         this.faq = this.productDetails[0].question;
    //         this.answer = this.productDetails[0].answer;
    //         this.actualPrice = this.productDetails[0].actual_price;
    //         this.sellingPrice = this.productDetails[0].selling_price;
    //         this.disAmount = this.productDetails[0].discount;

    //     })
    // }
    updateImage(index, skuId, image) {
        this.selectedImage = index;
        this.imgSku = skuId;
        this.skuImge = image;
    }
    removeImgPopup() {
        this.removeImg = !this.removeImg;
    }
    deleteImg: any;
    DeleteImg(i) {
        swal("Do you want to delete?", "", "warning", {
            buttons: ["Cancel!", "Okay!"],
        }).then((value) => {

            if (value === true) {
                this.deleteImg = i;
                var data = {
                    'id': this.deleteImg
                }
                this.appService.deleteProdImg(data).subscribe(resp => {
                    // this.editProImages();
                    this.router.navigate(['/prducts']);
                })
            } else {
                return;
            }
        });

    }


    // image;

    // changeListener($event): void {
    //     this.readThis($event.target);
    // }

    // readThis(inputValue: any): void {
    //     var file: File = inputValue.files[0];
    //     var myReader: FileReader = new FileReader();

    //     myReader.onloadend = (e) => {
    //         this.image = myReader.result;
    //         this.strImage = this.image.split(',')[1];
    //     }
    //     myReader.readAsDataURL(file);
    // }

    // image1;
    // changeListener1($event, index): void {
    //     this.readThis1($event.target, index);
    // }

    // readThis1(inputValue: any, index): void {
    //     this.vegImage = ''
    //     var file: File = inputValue.files[0];
    //     var myReader1: FileReader = new FileReader();

    //     myReader1.onloadend = (e) => {
    //         this.image1 = myReader1.result;
    //         this.vegImage = this.image1.split(',')[1];
    //         for (var i = 0; i < this.skusData.length; i++) {
    //             if (i === index) {
    //                 // this.skusData[i].image = myReader.result;
    //                 this.skusData[i].vegImage = this.vegImage;
    //             }
    //         }
    //     }
    //     myReader1.readAsDataURL(file);
    // }
    // urls1 = [];
    // img1: any;
    // strImage1: any;
    // images1 = [];
    // onSelectFile1(event, index) {
    //     if (event.target.files && event.target.files[0]) {
    //         var filesAmount = event.target.files.length;
    //         for (let i = 0; i < filesAmount; i++) {
    //             const fileReader: FileReader = new FileReader();

    //             fileReader.onload = (event: Event) => {
    //                 this.img1 = fileReader.result;
    //                 this.strImage1 = this.img1.split(',')[1];
    //                 this.images1.push(this.strImage1);
    //                 for (var i = 0; i < this.skusData.length; i++) {
    //                     if (i === index) {
    //                         // this.skusData[i].image = myReader.result;
    //                         this.skusData[i].skuImage = this.images1;
    //                     }
    //                 }
    //             }

    //             fileReader.readAsDataURL(event.target.files[i]);
    //         }
    //     }
    // }

    image1;

    changeListener($event, index): void {
        this.readThis($event.target, index);
    }

    readThis(inputValue: any, index): void {
        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {

            this.image1 = myReader.result;
            this.strImage = this.image1.split(',')[1];
            for (var i = 0; i < this.skusData.length; i++) {
                if (i === index) {
                    this.skusData[i].image1 = myReader.result;
                    this.skusData[i].quality_image = this.strImage;
                }
            }
        }
        myReader.readAsDataURL(file);
    }

    sku() {
        this.skuImg = '';
        this.vegImage = '';
        // this.quality_image = ''
        // this.images1 = [];
        this.images = [];
        this.urls = [];
        this.image1 = [];
        this.skusData.push({
            size: '',
            quantity: '',
            mrp: '',
            offer: '',
            sellingPrice: '',
            stock: '',
            skuImage: this.skuImg,
            quality_image: this.vegImage,
            image: this.type,
            country: '',
            state: '',
            city: '',
            area: '',
            express_delivery: false,
            normal_delivery: this.selectedNormalValue,
            Description: '',
            specification: '',
            terms: '',
            faq: '',
            answer: '',
            sku_images: [],

        });
    }

    deleteSku(index) {
        this.skusData.splice(index, 1);
    }


    updateProduct() {


        for (var i = 0; i < this.newSkuData.length; i++) {
            this.updatedSkus.push({
                "skid": this.newSkuData[i].skid,
                "product_id": this.newSkuData[i].product_id,
                "size": this.newSkuData[i].size,
                "actual_price": this.newSkuData[i].actual_price,
                "mrp": this.newSkuData[i].mrp,
                "min_quantity": this.newSkuData[i].min_quantity,
                "stock": this.newSkuData[i].stock,
                "selling_price": this.newSkuData[i].selling_price,
                "offer_price": this.newSkuData[i].offer_price,
                "image": this.newSkuData[i].image,
                "express_delivery": this.newSkuData[i].express_delivery,
                "normal_delivery": this.newSkuData[i].normal_delivery,
                "image_quality_path": this.newSkuData[i].sku_image,
                "quality_image": this.newSkuData[i].quality_image,
                "description": this.newSkuData[i].description,
                "specification": this.newSkuData[i].specification,
                "country": this.newSkuData[i].country,
                "state": this.newSkuData[i].state,
                "city": this.newSkuData[i].city,
                "area": this.newSkuData[i].area,
                "sku_images": this.newSkuData[i].sku_images,
                "terms": this.newSkuData[i].terms,
                "faq": this.newSkuData[i].faq,
            })
        }

        var data = {
            "id": this.productId,
            "title": this.proName,
            "category_id": this.cat_id,
            "category2_id": this.subCat_id,
            "brand_id": this.brand_id,
            "brand_name": this.Manufacture,
            "sku": this.updatedSkus,









            // 'category_id': (this.caId === undefined) ? this.categoryId : this.caId,
            // 'title': this.proName,
            // 'id': this.productId,
            // 'subcategory_id': (this.subCatId === undefined) ? this.subCateId : this.subCatId,
            // 'subcategory_id': this.subCatId,
            // 'image': this.images,
            // "sku": this.size,
            // "description": this.Description,
            // "actual_price": this.mrp,
            // "offer_price": this.offer,
            // "manufacture_name": this.Manufacture
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




    discountOption: any;
    changeDiscountOpt(event) {
        this.discountOption = event;
        if (this.discountOption === 'Rupees') {
            this.amount = true;
            this.percentage = false;
        }
        else {
            this.amount = false;
            this.percentage = true;
        }
    }

    //get country
    getLocation() {
        this.appService.getLocation().subscribe(resp => {
            this.locationData = resp.json().result;
            for (var i = 0; i < this.locationData.length; i++) {
                this.countryData.push(this.locationData[i].country);
            }

            for (var i = 0; i < this.countryData.length; i++) {
                this.countrys = _.uniq(this.countryData, function (obj) {
                    return obj;
                });
                // this.sValues.push(this.states);
            }
        })

    }

    //get state
    getStates(country) {
        this.country = country;
        this.statesData = [];

        for (var i = 0; i < this.locationData.length; i++) {
            if (this.locationData[i].country === country) {
                this.statesData.push(this.locationData[i].state);
            }
        }

        for (var i = 0; i < this.statesData.length; i++) {
            this.states = _.uniq(this.statesData, function (obj) {
                return obj;
            });
            // this.sValues.push(this.states);
        }
    }

    //get city
    getCitys(state) {
        this.state = state;
        this.citysData = [];
        this.areas = [];
        for (var i = 0; i < this.locationData.length; i++) {
            if (this.locationData[i].state === state) {
                this.citysData.push(this.locationData[i].city);
            }
        }

        for (var i = 0; i < this.citysData.length; i++) {
            this.citys = _.uniq(this.citysData, function (obj) {
                return obj;
            });
            // this.sValues.push(this.states);
        }
    }

    //get area
    getArea(city) {
        this.city = city;
        this.areasData = [];
        for (var i = 0; i < this.locationData.length; i++) {
            if (this.locationData[i].city === city) {
                this.areasData.push(this.locationData[i].area);
            }
        }

        for (var i = 0; i < this.areasData.length; i++) {
            this.areas = _.uniq(this.areasData, function (obj) {
                return obj;
            });
            // this.sValues.push(this.states);
        }
    }

    //chage area
    changeArea(area) {
        this.area = area;
    }

    foodType(value, index) {
        // this.type = 'NonVegetrian';
        if (value === true) {
            this.type = 'Vegetrian'
        }
        else {
            this.type = 'NonVegetrian'
        }
        for (var i = 0; i < this.skusData.length; i++) {
            if (i === index) {
                this.skusData[i].image = this.type
                // this.skusData[i].quality_image = this.strImage;
            }
        }
        // console.log(this.type);
    }
}
