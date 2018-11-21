import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'add-users',
    templateUrl: './add.slot.html',
    styleUrls: ['./slot.component.css']
})
export class AddSlotComponent implements OnInit {
    slot;
    model;
    starttime;
    endtime
    constructor(private AppService: AppService) { }

    ngOnInit() {
        console.log(new Date());

    }
    addSlot() {

        var data = {
            'slot_name': this.slot,
            'date': this.model.formatted,
            'start_time': this.starttime,
            'end_time': this.endtime
        }
        this.AppService.addCat(data).subscribe(resp => {

        })
    }

}
