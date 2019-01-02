import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-ware-house',
    templateUrl: './ware-house.component.html',
    styleUrls: ['./ware-house.component.css']
})
export class WareHouseComponent implements OnInit {
    warehouse;
    constructor(private appservice: AppService, private spinnerService: Ng4LoadingSpinnerService, public router: Router) { }

    ngOnInit() {
        this.getwarehouse();
    }
    getwarehouse() {
        this.appservice.getwarehouse().subscribe(resp => {
            this.warehouse = resp.json().result;
        })
    }
    editLoc(id) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                warehouseId: id
            }
        }
        this.router.navigate(['/addwarehouse'], navigationExtras);
    }

    deleteLoc(id) {
        var params = {
            id: id
        }
        swal("Do you want to delete?", "", "warning", {
            buttons: ["Cancel!", "Okay!"],
        }).then((value) => {
            if (value === true) {
                var data = {
                    'id': id
                }
                this.appservice.deleteWareHoue(params).subscribe(resp => {
                    if (resp.json().status === 200) {
                        swal('Deleted Successfully', '', 'success');
                        this.getwarehouse();
                    }
                })
            } else {
                return;
            }
        });
    }

}
