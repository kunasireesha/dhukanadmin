import { LoginComponent } from './../login/login.component';
import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
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
    action;
    cityareas = [];
    data = {
        city: '',
        area: ''
    }
    warehouseAreas = [];
    changeAreaVlaue = false;
    constructor(private AppService: AppService, private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService, public router: Router) {
        this.route.queryParams.subscribe(params => {
            this.action = params.warehouseId;
            if (this.action !== undefined) {
                this.getWarehouseById();
            }
        })
    }

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
                this.warehouseAreas.push({ id: this.cityareas[i].id, name: this.cityareas[i].area });
                return;
            }
        }

    }
    addWarehouse() {
        var data = {
            "contry_id": this.cityId,
            "area_id": this.areaId,
            "address": this.address,
            "warehousename": this.name,
            "description": this.description,
            "cityname": this.data.city,
            "area":  this.data.area
        }
        this.AppService.addWarehouse(data).subscribe(resp => {
            swal('Add warehouse successfully', "", "success");
            this.router.navigate(['/WareHouse']);
        })
    }

    updateWarehouse() {
        var data = {
            "warehouse_contry_id": this.cityId,
            "warehouse_area_id": (this.changeAreaVlaue === false) ? this.cityareas[0].id : this.areaId,
            "warehouse_address": this.address,
            "warehouse_name": this.name,
            "warehouse_discription": this.description,
            "id": this.action,
            "cityname": this.data.city,
            "area": (this.changeAreaVlaue === false) ? this.cityareas[0].area : this.data.area
        }
        this.AppService.updatewarehouse(data).subscribe(resp => {
            if (resp.json().status === 200) {
                swal('update warehouse successfully', "", "success");
                this.router.navigate(['/WareHouse']);
            } else {
                swal(resp.json().message, "", "error");
            }
        })
    }



    getWarehouseById() {
        var params = {
            id: this.action
        }
        this.AppService.getwarehouseById(params).subscribe(resp => {
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
        })
    }
}
