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

        console.log(time);
        // return;

        var data = {
            'slot_name': this.slot,
            'date': this.model.formatted,
            'start_time': time,
            'end_time': time1
        }

        this.AppService.addCat(data).subscribe(resp => {

        })
    }

}
