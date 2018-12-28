import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'add-city',
    templateUrl: './addcity.component.html',
    styleUrls: ['./city.component.css']
})
export class AddCityComponent implements OnInit {
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;
    cityName;
    action;
    @ViewChild("search")
    public searchElementRef: ElementRef;
    constructor(private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone, private appService: AppService, private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService, public router: Router) {
        this.route.queryParams.subscribe(params => {
            this.action = params.deliveryId
        })
    }

    ngOnInit() {
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        //create search FormControl
        this.searchControl = new FormControl();
        //set current position
        this.setCurrentPosition();


        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.position = place.address_components[0].short_name;
                    this.zoom = 12;
                });
            });
        });
    }
    position;
    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }

    }
    city;
    positionValue;
    addCity() {
        this.positionValue = this.position.split('-');
        this.city = this.positionValue[0].trim();
        var data = {
            'city': this.city
        }
        this.appService.addCity(data).subscribe(resp => {
            if (resp.json().status === 200) {
                swal('Add city successfully', "", "success");
                this.router.navigate(['/city']);
            }
            else if (resp.json().status === 400) {
                swal(resp.json().result, "", "error");
            }
        })
    }
}
