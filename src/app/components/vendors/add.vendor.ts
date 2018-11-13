import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'add-vendors',
    templateUrl: './add.vendor.html',
    styleUrls: ['./vendors.component.css']
})
export class AddVendorsComponent implements OnInit {
    strImage: any;
    constructor() { }

    ngOnInit() {
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
