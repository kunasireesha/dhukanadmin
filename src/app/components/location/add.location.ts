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
        })
    }
    getCountries() {
        this.appService.getCountries().subscribe(resp => {
            if (resp.json().status === 200) {
                this.countrydata = resp.json().result;
            }
        })

    }
    getStates() {
        alert(this.countryId);

    }
    // getStates(){
    //     this.appService.getStatedUrl(id).subscribe(resp =>{

    //     })
    // }

}