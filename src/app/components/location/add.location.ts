import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'add-location',
    templateUrl: './add.location.html',
    styleUrls: ['./location.component.css']
})
export class AddlocationComponent implements OnInit {
    country;
    state;
    city;
    area;
    locations: any;
    countries: any;
    constructor(private appService: AppService, private httpClient: HttpClient) { }

    ngOnInit() {
        this.httpClient.get('https://restcountries.eu/rest/v2/all').subscribe(data => {
            this.countries = data;
        });
    }
    addLocation() {
        var data = {
            'country': this.country,
            'state': this.state,
            'city': this.city,
            'area': this.area

        }
        this.appService.addLocation(data).subscribe(resp => {

        })

    }

}