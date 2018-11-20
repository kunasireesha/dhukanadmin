import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';


@Component({
    selector: 'sub-cat',
    templateUrl: './subcategories.html',
    styleUrls: ['./subcategories.css']

})
export class SubCatComponent implements OnInit {
    category: any;
    subCategory: any;
    constructor(private appService: AppService, public router: Router) { }

    ngOnInit() {
        this.getSubCategory();
    }

    getSubCategory() {
        this.appService.getSubCategery().subscribe(resp => {
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
        swal("Do you want to delete?", "", "warning", {
            buttons: ["Cancel!", "Okay!"],
        }).then((value) => {

            if (value === true) {
                var data = {
                    'sub_cat_id': id
                }
                this.appService.deleteSubCat(data).subscribe(resp => {
                    swal("delete subCat successfully", '', 'success');
                    this.getSubCategory();
                })
            } else {
                return;
            }
        });

    }


    addSub(id, maincat, subcat, maincatId, action) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                'subCat': subcat,
                'mainCat': maincat,
                'id': id,
                'mainCatId': maincatId,
                'action': action
            }
        }
        this.router.navigate(['/addsubcategory'], navigationExtras);
    }
}

