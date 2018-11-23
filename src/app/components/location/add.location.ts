import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';

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
    constructor(private appService: AppService) { }

    ngOnInit() {
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