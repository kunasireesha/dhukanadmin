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
    productDetails;
    img;
    urls = [];
    imagenum;
    images = [];
    Productimages = [];
    selectedImage;
    Description;
    specification;
    terms;
    faq;
    mrp;
    skuImg = '';
    skuImage;
    vegImage
    skusData = [];
    skuValues = {
        size: '',
        quantity: '',
        mrp: '',
        offer: '',
        sellingPrice: '',
        stock: '',
        skuImage: this.skuImg,
        vegImage: this.vegImage
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
    constructor(private appService: AppService, private route: ActivatedRoute, public proserv: ProductService, public router: Router) {
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
    changeSubCat(name) {
        for (var i = 0; i < this.subCategoryName.length; i++) {
            if (name === this.subCategoryName[i].sub_cat) {
                this.subCatId = this.subCategoryName[i].id;
            }
        }
    }
    // value = [];
    selectedExpressValue = false;
    selectedNormalValue = true;
    checkbox(evt: boolean, id, data) {
        this.isChecked = evt;
        for (var i = 0; i < this.list.length; i++) {
            if (this.isChecked) {
                if (this.list[i].id === id && data.title === 'Express Delivery') {
                    this.isChecked = evt;
                    this.selectedExpressValue = true;
                    this.selectedNormalValue = true;
                    return;
                }
            } else {
                this.selectedExpressValue = false;
                this.selectedNormalValue = true;
                return;
            }
        }
        // if (id === data.id) {
        //     this.isChecked = evt;
        // }

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

    onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                const fileReader: FileReader = new FileReader();
                fileReader.onload = (event) => {
                    if (this.action !== '') {
                        if (this.selectedImage === undefined) {
                            this.img = fileReader.result;
                            this.strImage = this.img.split(',')[1];
                            this.productDetails[0].myImages.push({ 'id': '', 'product_image': fileReader.result });
                            this.images.push({ 'image_no': '', 'image_data': this.strImage })
                        } else {
                            this.img = fileReader.result;
                            this.strImage = this.img.split(',')[1];
                            for (var i = 0; i < this.productDetails[0].myImages.length; i++) {
                                if (this.productDetails[0].myImages[i].id === this.selectedImage) {
                                    this.productDetails[0].myImages.splice(i, 1)
                                }
                            }
                            this.productDetails[0].myImages.push({ 'id': this.selectedImage, 'product_image': fileReader.result });
                            this.images.push({ 'image_no': this.selectedImage, 'image_data': this.strImage })
                            // this.imagenum = this.urls.push(fileReader.result);
                        }
                    } else {
                        this.img = fileReader.result;
                        this.strImage = this.img.split(',')[1];
                        this.urls.push(fileReader.result);
                        this.images.push(this.strImage);

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
            'id': this.productId,
            'title': this.proName,
            'category_id': this.caId,
            'image': this.images,
            'subcategory_id': (this.subCatId === undefined) ? this.subCategoryId : this.subCatId,
            // 'actual_price': this.actualPrice,
            // 'selling_price': this.sellingPrice,
            'quality_image': this.strImage,
            // 'discount_type': this.discountOption,
            // 'discount_percentage': this.disAmount,
            'express_delivery': this.selectedExpressValue,
            'normal_delivery': this.selectedNormalValue,
            'description': this.Description,
            'specification': this.specification,
            'terms': this.terms,
            'manufacture_name': this.Manufacture,
            'sku': this.skusData,
            'question': this.faq,
            'answer': this.answer
        }
        console.log(data);
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
    editProImages() {
        var data = {
            'id': this.productId
        }
        this.appService.editproductImg(data).subscribe(resp => {
            this.productDetails = resp.json().result;
            this.proName = this.productDetails[0].title;
            this.categoryId = this.productDetails[0].category_id;
            this.categoryName = this.productDetails[0].category1;
            this.productId = this.productDetails[0].id;
            this.subCatName = this.productDetails[0].category2;
            this.subCateId = this.productDetails[0].category2_id;
            this.Description = this.productDetails[0].description;
            this.terms = this.productDetails[0].terms_and_conditions;
            this.faq = this.productDetails[0].question;
            this.answer = this.productDetails[0].answer;
            this.actualPrice = this.productDetails[0].actual_price;
            this.sellingPrice = this.productDetails[0].selling_price;
            this.disAmount = this.productDetails[0].discount;

        })
    }
    updateImage(index) {
        this.selectedImage = index;
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
                    this.editProImages();
                    this.router.navigate(['/prducts']);
                })
            } else {
                return;
            }
        });

    }


    image;

    changeListener($event): void {
        this.readThis($event.target);
    }

    readThis(inputValue: any): void {
        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.image = myReader.result;
            this.strImage = this.image.split(',')[1];
        }
        myReader.readAsDataURL(file);
    }

    image1;
    changeListener1($event, index): void {
        this.readThis1($event.target, index);
    }

    readThis1(inputValue: any, index): void {
        this.vegImage = ''
        var file: File = inputValue.files[0];
        var myReader1: FileReader = new FileReader();

        myReader1.onloadend = (e) => {
            this.image1 = myReader1.result;
            this.vegImage = this.image1.split(',')[1];
            for (var i = 0; i < this.skusData.length; i++) {
                if (i === index) {
                    // this.skusData[i].image = myReader.result;
                    this.skusData[i].vegImage = this.vegImage;
                }
            }
        }
        myReader1.readAsDataURL(file);
    }
    urls1 = [];
    img1: any;
    strImage1: any;
    images1 = [];
    onSelectFile1(event, index) {
        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                const fileReader: FileReader = new FileReader();

                fileReader.onload = (event: Event) => {
                    this.img1 = fileReader.result;
                    this.strImage1 = this.img1.split(',')[1];
                    this.images1.push(this.strImage1);
                    for (var i = 0; i < this.skusData.length; i++) {
                        if (i === index) {
                            // this.skusData[i].image = myReader.result;
                            this.skusData[i].skuImage = this.images1;
                        }
                    }
                }

                fileReader.readAsDataURL(event.target.files[i]);
            }
        }
    }


    sku() {
        this.skuImg = '';
        this.vegImage = '';
        this.images1 = [];
        this.skusData.push({
            size: '',
            quantity: '',
            mrp: '',
            offer: '',
            sellingPrice: '',
            stock: '',
            skuImage: this.skuImg,
            vegImage: this.vegImage
        });
    }
    deleteSku(index) {
        this.skusData.splice(index, 1);
    }
    updateProduct() {
        var data = {
            'category_id': (this.caId === undefined) ? this.categoryId : this.caId,
            'title': this.proName,
            'id': this.productId,
            'subcategory_id': (this.subCatId === undefined) ? this.subCateId : this.subCatId,
            'image': this.images,
            "sku": this.size,
            "description": this.Description,
            "actual_price": this.mrp,
            "offer_price": this.offer,
            "manufacture_name": this.Manufacture
        }
        this.appService.updateProduct(data)
            .subscribe(resp => {
                // if (resp.json().message === 'Success') {
                //     this.category = resp.json().result;
                swal('update product successfully', '', 'success')
                this.router.navigate(['/prducts']);
                // }
                // else {
                // }
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
}
