import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'add-cat',
    templateUrl: './add.cat.html',
    styleUrls: ['./add.cat.css']


})
export class AddCatComponent implements OnInit {
    data: any;
    input;
    strImage: any;
    textarea
    constructor(private appService: AppService, private route: ActivatedRoute, public router: Router, private spinnerService: Ng4LoadingSpinnerService) {
        this.route.queryParams.subscribe(params => {
            this.catname = params.name
            this.id = params.id
            this.pic = params.pic
            this.des = params.des
        });

        if (this.catname === '') {
            this.addcat = true;
        } else {
            this.addcat = false;
            this.input = this.catname;
            this.textarea = this.des;
            this.catImg = this.pic;
        }
    }

    catname;
    id;
    addcat: boolean;
    pic;
    des;
    catImg;
    ngOnInit() {
        // this.addCat();
    }

    //add category
    addCat(name) {
        this.spinnerService.show();
        var data = {
            'name': name,
            'image': this.strImage,
            'description': this.textarea

        }
        this.appService.addCat(data)
            .subscribe(resp => {
                if (resp.json().message === 'Success') {
                    this.data = resp.json().result;
                    this.spinnerService.hide();
                    swal('Category added', '', 'success');
                    this.router.navigate(['/category']);

                }
                else if (resp.json().status === 400) {
                    swal(resp.json().err_field, '', 'error');
                }
            },
                error => {
                    console.log(error, "error");
                })
    }

    //update category
    updateCat(name) {
        this.spinnerService.show();
        var data = {
            'name': name,
            'id': this.id,
            'image': this.strImage,
            'description': this.textarea
        }
        this.appService.updateCat(data)
            .subscribe(resp => {
                this.spinnerService.hide();
                swal('update category successfully', '', 'success');
                this.router.navigate(['/category']);
            }),
            error => {
                console.log(error, "error");
            }
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
}