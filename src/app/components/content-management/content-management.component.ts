import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from 'ng2-ckeditor';

@Component({
    selector: 'app-content-management',
    templateUrl: './content-management.component.html',
    styleUrls: ['./content-management.component.css']
})
export class ContentManagementComponent implements OnInit {
    title;
    ckeditorContent;
    encodeData;
    termsData;
    decodeData;
    termsId;
    encodeData1;
    ngAfterViewChecked() {
        // let editor = this.ckEditor.instance;
        // editor.config.height = '400';
        // editor.config.autoParagraph = false;
        // editor.config.toolbarGroups = [
        // { name: 'document', groups: ['mode', 'document', 'doctools'] },
        // { name: 'clipboard', groups: ['clipboard', 'undo'] },
        // { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        // { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        // { name: 'insert', groups: ['insert'] }
        // ]
        // editor.config.removeButtons = 'Source,Save,Templates,Find,Replace,Scayt,SelectAll,Form,Radio';
    }
    constructor(private AppService: AppService) {

    }

    ngOnInit() {
        this.getTerms();
    }
    Terms() {
        this.encodeData = btoa(this.ckeditorContent);
        var data = {
            "description": this.encodeData,
            "title": this.title
        }
        this.AppService.termsFooter(data).subscribe(resp => {

        })
    }
    getTerms() {
        this.AppService.getTerms().subscribe(resp => {
            this.termsData = resp.json().result[0].description;
            this.decodeData = atob(this.termsData);
            this.ckeditorContent = this.decodeData;
            this.title = resp.json().result[0].type;
            this.termsId = resp.json().result[0].id;
        })
    }
    updateTerms() {
        this.encodeData1 = btoa(this.decodeData);
        console.log(this.encodeData1);
        var data = {
            // 'title': this.title,
            'description': btoa(this.ckeditorContent),
            'id': this.termsId
        }
        this.AppService.updateTerms(data).subscribe(resp => {
            if (resp.json().status === 200) {
                swal('update content successfully', '', 'success');
            }
        })
    }

}
