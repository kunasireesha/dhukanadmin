import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
    getcountry: any;
    states: any;
    cities: any;
    locations: any;
    moreCountry = false;
    moreState = false;
    moreCity = false;
    moreArea = false;
    locationData = [];
    constructor(private httpClient: HttpClient, private appService: AppService) { }

    ngOnInit() {
        this.getLocation();
    }
    country() {
        this.moreCountry = !this.moreCountry;
    }
    state() {
        this.moreState = !this.moreState;
    }
    city() {
        this.moreCity = !this.moreCity;
    }
    area() {
        this.moreArea = !this.moreArea;
    }
    getLocation() {
        this.appService.getLocation().subscribe(resp => {
            this.locationData = resp.json().result;
        })
    }
    deleteLoc(id) {
        this.appService.deleteLocation(id).subscribe(resp => {
            swal(resp.json().message, "", "success");
            this.getLocation();
        })
    }
    // getCountries() {
    //     this.appService.getCountries().subscribe(resp => {
    //         this.getcountry = resp.json().result;
    //     })
    // }
    // getStatesbyId(id) {
    //     var data = {
    //         'state_id': id
    //     }
    //     this.appService.getStatedbyId(data).subscribe(resp => {

    //     })
    // }


}
