import { AppService } from './../../services/dhukan/dhukan-data.service';
import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-area',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
    areas;
    p: number = 1;
    constructor(private AppService: AppService, private spinnerService: Ng4LoadingSpinnerService, public router: Router) { }

    ngOnInit() {
        this.getArea();
    }
    getArea() {
        this.AppService.getArea().subscribe(resp => {
            this.areas = resp.json().result;
        })
    }
    editArea(id, warehouseId) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                areaId: id,
                warehouse_Id: warehouseId
            }
        }
        this.router.navigate(['/addarea'], navigationExtras);
    }
    deleteAreas(id) {
        swal("Do you want to delete?", "", "warning", {
            buttons: ["Cancel!", "Okay!"],
        }).then((value) => {
            if (value === true) {
                var data = {
                    'id': id
                }
                this.AppService.deleteArea(data).subscribe(resp => {
                    swal("Deleted successfully", '', 'success');
                    this.getArea();
                })
            } else {
                return;
            }
        });
    }

}
