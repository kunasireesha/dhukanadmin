import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css']
})
export class ContentManagementComponent implements OnInit {

  constructor() { }
  mycontent;
  ckeConfig: any;

  ngOnInit() {
    this.mycontent = "hello";
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
  }

}
