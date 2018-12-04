import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'add-location',
    templateUrl: './add.location.html',
    styleUrls: ['./location.component.css']
})
export class AddlocationComponent implements OnInit {
    countryId;
    state;
    city;
    area;
    locations: any;
    countrydata = [];
    statesData = [];
    constructor(private appService: AppService, private httpClient: HttpClient) { }

    ngOnInit() {
        this.getCountries();

        // this.httpClient.get('https://restcountries.eu/rest/v2/all').subscribe(data => {
        //     this.countries = data;
        // });
    }


    changeCountry(id) {
        this.countryId = id;
        this.appService.getStatedUrl(this.countryId).subscribe(resp => {
            if (resp.json().status === 200) {
                this.statesData = resp.json().result;
            }

        })
    }
    getCountries() {
        this.appService.getCountries().subscribe(resp => {
            if (resp.json().status === 200) {
                this.countrydata = resp.json().result;
            }
        })

    }
    stateId;
    cityData = [];
    areaData = [];
    changeState(id) {
        this.stateId = id;
        this.appService.getCityUrl(this.stateId).subscribe(resp => {
            if (resp.json().status === 200) {
                this.cityData = resp.json().result;
            }
        })
    }
    changeCity(id) {
        this.stateId = id;
        this.appService.getAreaUrl(this.stateId).subscribe(resp => {
            if (resp.json().status === 200) {
                this.areaData = resp.json().result;
                console.log(this.areaData);
                debugger;
            }
        })
    }

}