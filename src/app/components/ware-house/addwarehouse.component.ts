import { LoginComponent } from './../login/login.component';
import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
@Component({
    selector: 'add-users',
    templateUrl: './addwarehouse.component.html',
    styleUrls: ['./ware-house.component.css']
})
export class AddwarehouseComponent implements OnInit {
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    @ViewChild("search")
    public searchElementRef: ElementRef;
    cities;
    areas;
    cityId;
    areaId;
    address;
    name;
    description;
    action;
    cityareas = [];
    data = {
        city: '',
        area: ''
    }
    warehouseAreas = [];
    changeAreaVlaue = false;
    constructor(private AppService: AppService, private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService, public router: Router,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone) {
        this.route.queryParams.subscribe(params => {
            this.action = params.warehouseId;
            if (this.action !== undefined) {
                this.getWarehouseById();
            }
        })
    }
    position;
    myOptions: IMultiSelectOption[];
    optionsModel: number[];
    onChange(event) {
        console.log(this.optionsModel);

    }
    ngOnInit() {
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
                    this.position = place.formatted_address;
                    console.log(this.position);
                    this.zoom = 12;
                });
            });
        });

        this.getCities();
        this.getArea();
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
    getCities() {
        this.AppService.getCity().subscribe(resp => {
            this.cities = resp.json().result;
        })
    }
    getArea() {
        this.AppService.getArea().subscribe(resp => {
            this.areas = resp.json().result;
        })
    }
    changeCity(value) {
        this.cityareas = [];
        this.warehouseAreas = [];
        for (var i = 0; i < this.cities.length; i++) {
            if (value === this.cities[i].contry) {
                this.cityId = this.cities[i].id;
                this.data.city = this.cities[i].contry;
            }
        }



        for (var j = 0; j < this.areas.length; j++) {
            if (value === this.areas[j].contry) {
                this.cityareas.push(this.areas[j]);
            }
        }


    }
    changeArea(value) {
        this.changeAreaVlaue = true;
        for (var i = 0; i < this.cityareas.length; i++) {
            if (value === this.cityareas[i].area) {
                this.areaId = this.cityareas[i].id;
                this.data.area = this.cityareas[i].area;
                if (this.action !== undefined) {
                    this.warehouseAreas.push({ id: '', area_name: this.cityareas[i].area, name: this.cityareas[i].area, adress_id: this.action, area_id: this.cityareas[i].id });
                } else {
                    this.warehouseAreas.push({ id: this.cityareas[i].id, area_name: this.cityareas[i].area, name: this.cityareas[i].area });
                }
                return;
            }
        }

    }
    addWarehouse() {
        var data = {
            "contry_id": this.cityId,
            "area_id": this.areaId,
            "address": this.position,
            "warehousename": this.name,
            "description": this.description,
            "cityname": this.data.city,
            "area": this.warehouseAreas
        }
        this.AppService.addWarehouse(data).subscribe(resp => {
            swal('Add warehouse successfully', "", "success");
            this.router.navigate(['/WareHouse']);
        })
    }

    updateWarehouse() {
        this.spinnerService.show();
        var data = {
            "warehouse_contry_id": this.cityId,
            "warehouse_address": this.position,
            "warehouse_name": this.name,
            "warehouse_discription": this.description,
            "id": this.action,
            "cityname": this.data.city,
            "area": this.warehouseAreas
        }
        this.AppService.updatewarehouse(data).subscribe(resp => {
            if (resp.json().status === 200) {
                this.spinnerService.hide();
                swal('update warehouse successfully', "", "success");
                this.router.navigate(['/WareHouse']);
            } else {
                swal(resp.json().message, "", "error");
            }
        })
    }


    areanames;
    getWarehouseById() {
        var params = {
            id: this.action
        }
        this.AppService.getwarehouseById(params).subscribe(resp => {
            this.warehouseAreas = resp.json().result[0].area;
            this.data.area = resp.json().result[0].area;
            this.data.city = resp.json().result[0].contry;
            this.cityId = resp.json().result[0].warehouse_contry_id;
            this.areaId = resp.json().result[0].warehouse_area_id
            this.name = resp.json().result[0].name;
            this.description = resp.json().result[0].warehouse_discription;
            this.address = resp.json().result[0].warehouse_address;
            for (var i = 0; i < this.areas.length; i++) {
                if (this.data.city === this.areas[i].contry) {
                    this.cityareas.push(this.areas[i]);
                }
            }
            // for (var i = 0; i < this.data.area.length; i++) {
            // this.789= this.data.area[i].area_name;
            // }
        })
    }
}
