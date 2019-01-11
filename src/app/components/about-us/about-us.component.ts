import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
    ckeditorContent;
    encodeData;
    title;
    aboutusData;
    decodeData;
    aboutusId;
    constructor(private appService: AppService) { }

    ngOnInit() {
        this.getAboutUs();
    }
    Terms() {
        this.encodeData = btoa(this.ckeditorContent);
        var data = {
            'title': this.title,
            'description': this.encodeData,
        }
        this.appService.termsFooter(data).subscribe(resp => {
        })
    }
    getAboutUs() {
        this.appService.getAboutUs().subscribe(resp => {
            this.aboutusData = resp.json().result[0].description;
            this.decodeData = atob(this.aboutusData);
            this.ckeditorContent = this.decodeData;
            this.title = resp.json().result[0].type;
            this.aboutusId = resp.json().result[0].id;
        })
    }
    updateabout() {
        this.encodeData = btoa(this.ckeditorContent);
        var data = {
            'title': this.title,
            'description': this.encodeData,
            'id': this.aboutusId
        }
        this.appService.updateTerms(data).subscribe(resp => {
            if (resp.json().status === 200) {
                swal('update content successfully', '', 'success');
            }
        })
    }
}
