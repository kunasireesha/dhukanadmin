import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'sub-cat',
    templateUrl: './subcategories.html',
    styleUrls: ['./subcategories.css']

})
export class SubCatComponent implements OnInit {
    category: any;
    subCategory: any;
    p: number = 1;
    constructor(private appService: AppService, public router: Router, private spinnerService: Ng4LoadingSpinnerService) { }

    ngOnInit() {
        this.getSubCategory();
    }

    getSubCategory() {
        this.spinnerService.show();
        this.appService.getSubCategery().subscribe(resp => {
            this.spinnerService.hide();
            this.subCategory = resp.json().result;
            if (resp.json().result.length === 0) {
                swal("No data found, please add new one", '', 'error');
            }
        },
            error => {
                console.log(error, "error");
            }
        )
    }
    deleteSubCat(id) {
        this.spinnerService.show();
        swal("Do you want to delete?", "", "warning", {
            buttons: ["Cancel!", "Okay!"],
        }).then((value) => {

            if (value === true) {
                var data = {
                    'sub_cat_id': id
                }
                this.appService.deleteSubCat(data).subscribe(resp => {
                    this.spinnerService.hide();
                    swal("delete subCat successfully", '', 'success');
                    this.getSubCategory();
                })
            } else {
                return;
            }
        });

    }


    addSub(id, maincat, subcat, maincatId, action, img, des) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                'subCat': subcat,
                'mainCat': maincat,
                'id': id,
                'mainCatId': maincatId,
                'action': action,
                'img': img,
                'des': des
            }
        }
        this.router.navigate(['/addsubcategory'], navigationExtras);
    }
}

