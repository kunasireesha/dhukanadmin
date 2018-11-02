import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
// interface EventTarget { result: any; }
@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
    fileSelectMsg: string = 'No file selected yet.';
    fileUploadMsg: string = 'No file uploaded yet.';
    disabled: boolean = false;
    url = '';
    constructor(private appService: AppService) { }
    product;
    catId;
    ngOnInit() {
        // this.getProduct()
    }
    public fileEvent($event) {
        const fileSelected: File = $event.target.files[0];
        this.appService.uploadFile(fileSelected)
            .subscribe((response) => {
                console.log('set any success actions...');
                return response;
            },
                (error) => {
                    console.log('set any error actions...');
                });
    }
}
