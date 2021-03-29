import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitMeasure } from '@app/_models/item.model';
import { AlertService } from '@app/_services';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ItemService } from "src/app/_services/item.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: []
})
export class ItemComponent implements OnInit {


  isValid: boolean = true;
  itemsList;
  forUpdate: boolean = false;
  submitted = false;
  loading = false;
  item;
  unitMeasure = UnitMeasure;
  enumKeys = [];
  constructor(public dialog: MatDialog,
    public service: ItemService,
    private alertService: AlertService,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    public router: Router,
    private currentRoute: ActivatedRoute) { 
      this.enumKeys=Object.keys(this.unitMeasure);
    }

  ngOnInit(): void {
    let ItemId = this.currentRoute.snapshot.paramMap.get('id');
    if (ItemId == null) {
      this.resetForm();
    }
    else {
      this.service.getItemById((ItemId)).subscribe(val => this.service.formData = val);
      this.forUpdate = true;
    }
    this.itemsList = this.service.getItemsList();
  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.service.formData = {
      ItemId: null,
      Name: "",
      VAT: 0,
      UnitMeasure: UnitMeasure.L,
      Price: 0
    }
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.submitted = true;

      this.alertService.clear();

      if (form.invalid) {
        return;
      }

      this.loading = true;
      if (this.forUpdate == true) {
        this.service.update()
          .pipe(first())
          .subscribe({
            next: () => {
              this.alertService.success('Update successful', { keepAfterRouteChange: true });
              this.toastr.success("Successfully saved!");
              this.router.navigateByUrl('/items');
            },
            error: error => {
              this.alertService.error(error);
              this.loading = false;
            }
          });
      } else {
        this.submitted = true;

        this.alertService.clear();

        if (form.invalid) {
          return;
        }

        this.loading = true;
        this.service.save()
          .pipe(first())
          .subscribe({
            next: () => {
              this.alertService.success('Item is added', { keepAfterRouteChange: true });
              this.router.navigate(['../items'], { relativeTo: this.route });
            },
            error: error => {
              this.alertService.error(error);
              this.loading = false;
            }
          });
      }
    }
  }

  validateForm() {
    this.isValid = true;
    if (this.service.formData.ItemId == 0)
      this.isValid = false;

    if (this.service.formData.VAT == 0 || this.service.formData.Name == ""
      || this.service.formData.UnitMeasure == "" || this.service.formData.Price == 0) this.isValid = false;
    return this.isValid;
  }
}
