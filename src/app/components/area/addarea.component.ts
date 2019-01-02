import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'add-users',
    templateUrl: './addarea.component.html',
    styleUrls: ['./area.component.css']
})
export class AddAreaComponent implements OnInit {
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;
    position;
    cities;
    cityId;
    data = { cityVlaue: '' };
    action;
    area;
    wareHouse_id;
    @ViewChild("search")
    public searchElementRef: ElementRef;
    constructor(private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone, private spinnerService: Ng4LoadingSpinnerService, public router: Router, private AppService: AppService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.action = params.areaId;
            this.wareHouse_id = params.warehouse_Id
            if (this.action !== undefined) {
                this.getAreaById();
            }
        })
    }

    ngOnInit() {
        this.getCities();
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
    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }
    city(value) {
        for (var i = 0; i < this.cities.length; i++) {
            if (value === this.cities[i].contry) {
                this.cityId = this.cities[i].id;
                this.data.cityVlaue = this.cities[i].contry;
            }
        }
    }
    getCities() {
        this.AppService.getCity().subscribe(resp => {
            this.cities = resp.json().result;
        })
    }
    addArea() {
        // this.positionValue = this.position.split('-');
        // this.city = this.positionValue[0].trim();
        var data = {
            'area': this.position,
            'contry_id': this.cityId
        }
        this.AppService.addArea(data).subscribe(resp => {
            if (resp.json().status === 200) {
                swal("Area added Sucessfully", "", "success");
                this.router.navigate(['/area']);
            }
            else if (resp.json().status === 400) {
                swal(resp.json().result, "", "error");
            }
        })
    }
    updateArea() {
        var data = {
            'id': this.action,
            'warehouse_contry_id': this.cityId,
            'area': this.area
        }
        this.AppService.updateArea(data).subscribe(resp => {
            if (resp.json().status === 200) {
                swal("Area updated Sucessfully", "", "success");
                this.router.navigate(['/area']);
            }
        })
    }

    getAreaById() {
        var params = {
            id: this.action
        }
        this.AppService.getareaById(params).subscribe(resp => {
            this.area = resp.json().result[0].area;
            this.data.cityVlaue = resp.json().result[0].contry;
            this.position = resp.json().result[0].area;
            this.cityId = resp.json().result[0].warehouse_contry_id;
        })
    }
}
