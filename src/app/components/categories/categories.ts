import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert'
import { Router, NavigationExtras } from '@angular/router';


@Component({
    selector: 'categories',
    templateUrl: './categories.html',
    styleUrls: ['./categories.css']
})
export class CategoriesComponent implements OnInit {
    name;
    category: any;
    constructor(private appService: AppService, public router: Router) { }
    ngOnInit() {
        this.getCat();
    }
    // get cat list
    getCat() {
        this.appService.getCat()
            .subscribe(resp => {
                if (resp.json().message === 'Success') {
                    this.name = ""
                    this.category = resp.json().result;
                }
                else {

                }
            },
                error => {
                    console.log(error, "error");
                })
    }

    //delete category
    deleteCat(id) {
        var data = {
            'id': id
        }
        this.appService.deleteCat(data)
            .subscribe(resp => {
                swal("Deleted successfully", '', 'success');
                this.getCat();
            }),
            error => {
                console.log(error, "error");
            }
    }

    // add and update category
    addCat(name, id, pic) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                'name': name,
                'id': id,
                'pic': pic

            }
        }
        this.router.navigate(['/addcategory'], navigationExtras);
    }
}
