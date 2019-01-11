import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
    cities;
    p: number = 1;
    constructor(private appservice: AppService, private spinnerService: Ng4LoadingSpinnerService, public router: Router) { }

    ngOnInit() {
        this.getCities();
    }
    getCities() {
        this.appservice.getCity().subscribe(resp => {
            this.cities = resp.json().result;
        })
    }
    deleteCities(id) {
        swal("Do you want to delete?", "", "warning", {
            buttons: ["Cancel!", "Okay!"],
        }).then((value) => {
            if (value === true) {
                var data = {
                    'id': id
                }
                this.appservice.deleteCity(data).subscribe(resp => {
                    swal("Deleted successfully", '', 'success');
                    this.getCities();
                })
            } else {
                return;
            }
        });
    }
    editCity(uId) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                deliveryId: uId
            }
        }
        this.router.navigate(['/addcity'], navigationExtras);
    }
}
