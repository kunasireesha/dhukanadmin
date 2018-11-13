import { ExcelService } from './../../services/excel.service';
// import { ExcelService } from './../../excel.service';
import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ProductData } from '../../services/productdata';
import { ProductService } from '../../services/productService'
// import * as XLSX from 'ts-xlsx';


@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    product: any;
    productimg: any;
    image;
    constructor(private appService: AppService, public router: Router, public proServ: ProductService, private excelService: ExcelService) { }
    // url = 'http://versatilemobitech.co.in/DHUKAN/images/'
    ngOnInit() {
        this.getProduct();



    }
    data = [];
    arrVal = [];
    imgval = [];


    snapshotToArray(snapshot) {
        var returnArr = [];

        snapshot.forEach(function (childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            returnArr.push(item);
        });
        console.log(returnArr);
        return returnArr;
    };

    aa;
    bb;
    Image;
    //   get product
    getProduct() {
        let goodResponse = [];
        this.appService.getProduct()
            .subscribe(resp => {
                // if (resp.json().message === 'Success') {
                this.product = resp.json().result;
                for (var i = 0; i < this.product.length; i++) {
                    for (var j = 0; j < this.product[i].myImages.length; j++) {
                        this.product[i].image = this.product[i].myImages[0].product_image;
                    }
                }
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
    // delete product
    deleteProduct(id) {
        var data = {
            'id': id
        }
        this.appService.deleteProduct(data)
            .subscribe(resp => {
                if (resp.json().message === 'Success') {
                    swal('product delete successfully', '', 'success')
                    this.getProduct();
                }
                else {

                }
            },
                error => {
                    console.log(error, "error");
                })
    }
    addprod(add) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                prodId: add
            }
        }
        this.router.navigate(['/addprducts'], navigationExtras);
    }
    // editProd(title, catid, catName, prodId, subCat, subCatId) {
    //     let productDetails: ProductData = {
    //         categoryName: catName,
    //         categoryId: catid,
    //         subCategory: '',
    //         productName: title,
    //         productId: prodId,
    //         subCat: subCat,
    //         subCatId: subCatId,
    //         image: '',
    //         date: '',
    //     };
    //     this.proServ.products = productDetails;
    //     this.router.navigate(['/addprducts']);
    // }

    //    edit the product details
    editProd(id) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                prodId: id
            }
        }
        this.router.navigate(['/addprducts'], navigationExtras);
    }



    exportAsXLSX(): void {
        this.excelService.exportAsExcelFile(this.product, 'sample');
    }
    url = '';
    excel;
    public fileEvent($event) {
        const fileSelected: File = $event.target.files[0];
        this.appService.uploadFile(fileSelected)
            .subscribe((response) => {
                swal('Import excel successfully', '', 'success');
                this.getProduct();
                return response;

            },
                (error) => {
                    console.log('set any error actions...');
                });
    }
}
