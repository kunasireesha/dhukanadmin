import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
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
    selectedCountry;
    countryName;
    stateName;
    constructor(private appService: AppService, public router: Router) { }

    ngOnInit() {
        this.getCountries();

        // this.httpClient.get('https://restcountries.eu/rest/v2/all').subscribe(data => {
        //     this.countries = data;
        // });
    }


    changeCountry(id) {
        for (var i = 0; i < this.countrydata.length; i++) {
            if (this.countrydata[i].location_id === parseInt(id)) {
                this.countryName = this.countrydata[i].location;
            }
        }
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
    cityId;
    areaId;
    cityName;
    areaName;
    locationData = [];
    changeState(id) {
        for (var i = 0; i < this.statesData.length; i++) {
            if (this.statesData[i].location_id === parseInt(id)) {
                this.stateName = this.statesData[i].location;
            }
        }
        this.stateId = id;
        this.appService.getCityUrl(this.stateId).subscribe(resp => {
            if (resp.json().status === 200) {
                this.cityData = resp.json().result;
            }
        })
    }
    changeCity(id) {
        for (var i = 0; i < this.cityData.length; i++) {
            if (this.cityData[i].location_id === parseInt(id)) {
                this.cityName = this.cityData[i].location;
            }
        }
        this.cityId = id;
        this.appService.getAreaUrl(this.cityId).subscribe(resp => {
            if (resp.json().status === 200) {
                this.areaData = resp.json().result;
                console.log(this.areaData);
            }
        })
    }
    changeArea(id) {
        for (var i = 0; i < this.areaData.length; i++) {
            if (this.areaData[i].location_id === parseInt(id)) {
                this.areaName = this.areaData[i].location;
            }
        }
        this.areaId = id;
        this.appService.getAreaUrl(this.stateId).subscribe(resp => {
            if (resp.json().status === 200) {
                this.areaData = resp.json().result;
                console.log(this.areaData);
            }
        })
    }
    addLocation() {
        var inData = {
            "country": this.countryName,
            "state": this.stateName,
            "city": this.cityName,
            "area": this.areaName
        }
        this.appService.addLocation(inData).subscribe(resp => {
            console.log(resp.json());
            swal(resp.json().message, "", "success");
            this.router.navigate(['/location']);
        }, error => {
            console.log(error);
        })
    }

    autoCompleteCallback1(selectedData: any) {
        //do any necessery stuff.
    }


}