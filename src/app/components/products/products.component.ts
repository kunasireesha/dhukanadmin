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
    product = [];
    productimg: any;
    image;
    p: number = 0;
    constructor(private appService: AppService, public router: Router, public proServ: ProductService, private excelService: ExcelService) { }
    // url = 'http://versatilemobitech.co.in/DHUKAN/images/'
    ngOnInit() {
        this.getProduct(this.p);

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

        return returnArr;
    };
    changePage(page) {
        this.getProduct(page);

    }
    aa;
    bb;
    Image;
    totalCount;
    pages;
    pagination = [];
    paginationValues: {}
    //   get product
    getProduct(page) {
        let goodResponse = [];
        this.pagination = [];
        this.appService.getProduct(page)
            .subscribe(resp => {
                // if (resp.json().message === 'Success') {
                this.product = resp.json().data.results;
                this.paginationValues = resp.json().data.pagination;
                this.totalCount = resp.json().data.pagination.totalCount;
                this.pages = Math.ceil(this.totalCount / 10);
                console.log(this.pages);
                for (var i = 0; i < this.pages; i++) {
                    this.pagination.push(i);
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
    // delete product
    deleteProduct(id, page) {
        swal("Do you want to delete?", "", "warning", {
            buttons: ["Cancel!", "Okay!"],
        }).then((value) => {

            if (value === true) {
                var data = {
                    'id': id
                }
                this.appService.deleteProduct(data)
                    .subscribe(resp => {
                        if (resp.json().message === 'Success') {
                            swal('product delete successfully', '', 'success')
                            this.getProduct(page);
                        }
                        else {

                        }
                    },
                        error => {
                            console.log(error, "error");
                        })
            } else {
                return;
            }
        });


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
    editProd(id, page) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                prodId: id,
                page: page
            }
        }
        this.router.navigate(['/addprducts'], navigationExtras);
    }



    exportAsXLSX(): void {
        this.excelService.exportAsExcelFile(this.product, 'sample');
    }
    url = '';
    excel;
    public fileEvent($event, page) {
        const fileSelected: File = $event.target.files[0];
        this.appService.uploadFile(fileSelected)
            .subscribe((response) => {
                swal('Import excel successfully', '', 'success');
                this.getProduct(page);
                return response;

            },
                (error) => {
                    console.log('set any error actions...');
                });
    }
}
