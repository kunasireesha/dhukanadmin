import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';
@Component({
    selector: 'add-slot',
    templateUrl: './add.slot.html',
    styleUrls: ['./slot.component.css']
})
export class AddSlotComponent implements OnInit {
    public value: Date = new Date(2000, 2, 10, 10, 30, 0);
    public value1: Date = new Date(2000, 2, 10, 10, 30, 0);

    slot;
    model;
    starttime;
    endtime;

    constructor(private AppService: AppService, private route: ActivatedRoute, public router: Router) { }
    myOptions: IMultiSelectOption[];
    optionsModel: number[];
    onChange(event) {
        console.log(this.optionsModel);

    }
    ngOnInit() {
        this.getwarehouse();
        // console.log(new Date());

    }
    dataWare = [];
    warehouseData = [];
    warehouse;
    getwarehouse() {
        this.AppService.getwarehouse().subscribe(resp => {
            this.warehouse = resp.json().result;
        })
    }
    addSlot() {
        // this.dataWare = [];
        // for (var i = 0; i < this.warehouse.length; i++) {
        //     for (var j = 0; j < this.optionsModel.length; j++) {
        //         if (this.warehouse[i].id === this.optionsModel[j]) {
        //             this.warehouseData.push({ id: this.optionsModel[j], name: this.warehouse[i].name })
        //         }
        //     }
        // }
        // this.dataWare = _.uniq(this.warehouseData, function (obj) {
        //     return obj.id;
        // });

        var date = new Date(this.value);
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var time = hours + ":" + minutes + ":" + seconds + ' ' + ((date.getHours() >= 12) ? 'PM' : 'AM')
            ;

        var date1 = new Date(this.value1);
        var hours1 = date1.getHours() > 12 ? date1.getHours() - 12 : date1.getHours();
        var minutes1 = date1.getMinutes();
        var seconds1 = date1.getSeconds();
        var time1 = hours1 + ":" + minutes1 + ":" + seconds1 + ' ' + ((date1.getHours() >= 12) ? 'PM' : 'AM')
            ;
        // return;

        var data = {
            'slot_name': this.slot,
            'date': this.model.formatted,
            'start_time': time,
            'end_time': time1,
            // 'warehouse': this.dataWare
        }

        this.AppService.addSlot(data).subscribe(resp => {
            swal("slot added successfully", "", "success");
            this.router.navigate(['/slot']);
        })
    }
}
