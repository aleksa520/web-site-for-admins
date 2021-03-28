import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '@app/_services/customerorder.service';
import { OrderItemsComponent } from '../order-items/order-items.component';


@Component({
  selector: 'app-order',
  templateUrl: './customerorder.component.html',
  styleUrls: []
})


export class OrderComponent implements OnInit {
  isValid: boolean = true;

  constructor(public service:OrderService,
    public dialog: MatDialog,
    public router: Router,
    public toastr: ToastrService,
    private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.resetForm();

  }

  resetForm(form?:NgForm){
    if(form=null)
    form.resetForm();
    this.service.formData = {
      OrderId: 0,
      DateCreated: new Date(),
      DateUpdated: null,
      GTotal: 0,
      Status:0,
      DeletedItemsIDs:""
    };
    this.service.orderItems = [];
  }



  AddOrEditOrderItem(orderItemIndex, OrderId)
  {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {orderItemIndex, OrderId};

        this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res=>
          {
            this.updateGrandTotal();
          });
    
  }

  onDeleteOrderItem(orderItemID:number, i: number) {
    if (orderItemID != null)
     this.service.formData.DeletedItemsIDs += orderItemID + ",";
     this.service.orderItems.splice(i, 1);
     this.updateGrandTotal();
  }

  updateGrandTotal() {
    this.service.formData.GTotal = this.service.orderItems.reduce((prev, curr) => {
      return prev + curr.Total;
    }, 0);
    this.service.formData.GTotal = parseFloat(this.service.formData.GTotal.toFixed(2));
  }

  validateForm() {
    this.isValid = true;
   if (this.service.orderItems.length == 0)
      this.isValid = false;
    return this.isValid;
  }

  onSubmit(form: NgForm) {
    
    if (this.validateForm()) {
      
      this.service.saveOrder();
      this.resetForm();
      this.toastr.success('Submitted Successfully');
      this.router.navigate(['/orders']);
    }
    
  }

}
