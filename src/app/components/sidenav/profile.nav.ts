import { AppService } from '../../services/dhukan/dhukan-data.service';
// import { urls } from './../../services/constants/constants';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
    selector: 'profile-nav',
    templateUrl: './profile.nav.html',
    styleUrls: ['./profile.nav.css']


})
export class ProfileNavComponent implements OnInit {
    category:any

    constructor(private route: ActivatedRoute,private appService:AppService,
        private http: HttpClient) {
        this.pageNav = this.route.snapshot.data[0]['page'];
    }
    pageNav;
    ngOnInit() {
        // this.getCat();
    }
    
}