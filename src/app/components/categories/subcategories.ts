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
    delete() {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    swal("Deleted!", "Your file has been deleted!", "success");
                }
            });
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
        var data = {
            'sub_cat_id': id
        }
        this.appService.deleteSubCat(data).subscribe(resp => {
            swal("delete subCat successfully", '', 'success');
            this.getSubCategory();
        })
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

