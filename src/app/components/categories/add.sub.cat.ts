import { LoginComponent } from './../login/login.component';
import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'add-sub-cat',
    templateUrl: './add.sub.cat.html',
    styleUrls: ['./add.cat.css']

})
export class AddSubCatComponent implements OnInit {
    category: any;
    categoryId;
    subCat;
    id;
    subCa;
    mainCat;
    subCate: boolean;
    action;
    caId;
    mainCatId;
    textarea;
    constructor(private appService: AppService, private route: ActivatedRoute, public router: Router) {
        this.route.queryParams.subscribe(params => {
            this.id = params.id,
                this.subCa = params.subCat,
                this.mainCat = params.mainCat,
                this.mainCatId = params.mainCatId,
                this.action = params.action
        });
        if (this.action === 'addsub') {
            this.subCate = true;
        } else {
            this.subCate = false;
        }
    }
    changeCat(id) {
        this.mainCat = id;
        for (var i = 0; i < this.category.length; i++) {
            if (id === this.category[i].name) {
                this.caId = this.category[i].id
            }
        }

    }
    ngOnInit() {
        this.getCat();
    }

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
    insertSubCat() {
        var data = {
            'name': this.subCa,
            'categiryid': this.caId,
            'image': this.strImage,
            'description': this.textarea

        }
        this.appService.insertSubCat(data).subscribe(resp => {
            swal("add subCategory successfully", '', 'success');
            this.router.navigate(['/subcategory']);
        })
    }
    updateSubCat() {
        var data = {
            'sub_cat_id': this.id,
            'sub_cat': this.subCa,
            'main_cat_id': (this.caId === undefined) ? this.mainCatId : this.caId,
            'image': this.strImage,
            'description': this.textarea
        }
        this.appService.updateSubCat(data).subscribe(resp => {
            swal("update subCategory successfully", '', 'success');
            this.router.navigate(['/subcategory']);
        })
    }
    image;
    strImage: any;
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
}