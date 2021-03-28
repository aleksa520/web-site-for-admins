import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ItemService} from "src/app/_services/item.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: []
})
export class ItemComponent implements OnInit {

 
  isValid: boolean=true;
  itemsList;
  forUpdate: boolean=false;
  constructor(public dialog: MatDialog,public service: ItemService,
    public toastr: ToastrService,
    public router:Router,
    private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
   
    let ItemId = this.currentRoute.snapshot.paramMap.get('id');
    if(ItemId == null)
    this.resetForm();
    else { 
      this.service.formData = this.service.getItemById(parseInt(ItemId)); 
      this.forUpdate = true;
  }
  this.itemsList = this.service.getItemsList();    
}

resetForm(form?:NgForm){
  if(form=null)
  form.resetForm();
  this.service.formData={
    ItemId: null,
    Name: "",
    VAT: 0,
    UnitMeasure: "",
    Price:0
  }
}


onSubmit(form: NgForm) {
  if (this.validateForm()) {
      
    if(this.forUpdate == true)
    {
      this.service.update();
        this.resetForm();
        this.toastr.success("Successfully saved!");
        this.router.navigate(['items']);
    }else
    {
      this.service.save();
      this.resetForm();
      this.toastr.success("Successfully saved!");
      this.router.navigate(['items']);
    }
  }
}

validateForm() {
  this.isValid = true;
  if (this.service.formData.ItemId == 0)
    this.isValid = false;
  
    if(this.service.formData.VAT == 0 || this.service.formData.Name==""
    || this.service.formData.UnitMeasure=="" || this.service.formData.Price==0) this.isValid=false;
  return this.isValid;
}

}
