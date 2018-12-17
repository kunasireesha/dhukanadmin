import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'add-users',
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

    constructor(private AppService: AppService) { }

    ngOnInit() {
        // console.log(new Date());

    }
    addSlot() {
        var data = {
            'slot_name': this.slot,
            'date': this.model.formatted,
            'start_time': this.value,
            'end_time': this.value1
        }
        this.AppService.addCat(data).subscribe(resp => {

        })
    }

}
