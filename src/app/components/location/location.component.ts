import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
    countries: any;
    states: any;
    cities: any;
    constructor(private httpClient: HttpClient) { }

    ngOnInit() {

        this.httpClient.get('https://restcountries.eu/rest/v2/all').subscribe(data => {
            this.countries = data;
        });
    }

}
