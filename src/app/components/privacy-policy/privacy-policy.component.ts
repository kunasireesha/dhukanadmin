import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
    title;
    ckeditorContent;
    encodeData;
    PrivacyData;
    decodeData;
    privacyId;
    constructor(private appService: AppService) { }

    ngOnInit() {
        this.getPrivacy();
    }
    privacy() {
        this.encodeData = btoa(this.ckeditorContent);
        var data = {
            'title': this.title,
            'description': this.encodeData
        }
        this.appService.termsFooter(data).subscribe(resp => {

        })
    }
    getPrivacy() {
        this.appService.getPrivacyPolicy().subscribe(resp => {
            this.PrivacyData = resp.json().result[0].description;
            this.decodeData = atob(this.PrivacyData);
            this.ckeditorContent = this.decodeData;
            this.title = resp.json().result[0].type;
            this.privacyId = resp.json().result[0].id;
        })
    }
    updatePrivacy() {
        this.encodeData = btoa(this.ckeditorContent);
        var data = {
            'title': this.title,
            'description': this.encodeData,
            'id': this.privacyId
        }
        this.appService.updateTerms(data).subscribe(resp => {
            if (resp.json().status === 200) {
                swal('update content successfully', '', 'success');
            }
        })
    }
}
