import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'add-users',
    templateUrl: './addwarehouse.component.html',
    styleUrls: ['./ware-house.component.css']
})
export class AddwarehouseComponent implements OnInit {
    cities;
    areas;
    cityId;
    areaId;
    address;
    name;
    description;
    constructor(private AppService: AppService) { }

    ngOnInit() {
        this.getCities();
        this.getArea();
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
        for (var i = 0; i < this.cities.length; i++) {
            if (value === this.cities[i].contry) {
                this.cityId = this.cities[i].id;
            }
        }

    }
    changeArea(value) {
        for (var i = 0; i < this.areas.length; i++) {
            if (value === this.areas[i].area) {
                this.areaId = this.areas[i].id;
            }
        }
        alert(this.areaId);
    }
    addWarehouse() {
        var data = {
            "contry_id": this.cityId,
            "area_id": this.areaId,
            "address": this.address,
            "warehousename": this.name,
            "description": this.description
        }
        this.AppService.addWarehouse(data).subscribe(resp => {

        })
    }
}
