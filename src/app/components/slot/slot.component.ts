import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-slot',
    templateUrl: './slot.component.html',
    styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {
    slots;
    p: number = 1;
    constructor(private AppService: AppService, private route: ActivatedRoute, public router: Router) { }

    ngOnInit() {
        this.getSlot();
    }
    getSlot() {
        this.AppService.getSlot().subscribe(resp => {
            this.slots = resp.json().data;
        })
    }
    deleteSlot(id) {
        swal("Do you want to delete?", "", "warning", {
            buttons: ["Cancel!", "Okay!"],
        }).then((value) => {

            if (value === true) {
                var data = {
                    'id': id
                }
                this.AppService.deleteSlot(data).subscribe(response => {
                    swal("Deleted successfully", '', 'success');
                    this.getSlot();
                }, error => {

                })
            } else {
                return;
            }
        });
    }

}
