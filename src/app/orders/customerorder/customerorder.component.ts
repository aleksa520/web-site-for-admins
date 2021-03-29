import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '@app/_services/customerorder.service';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { first } from 'rxjs/operators';
import { AlertService } from '@app/_services';
import { Order, OrderStatus } from '@app/_models/customerorder.model';

@Component({
  selector: 'app-order',
  templateUrl: './customerorder.component.html',
  styleUrls: []
})
export class OrderComponent implements OnInit {
  isValid: boolean = true;
  submitted = false;
  loading = false;
  orderStatus = OrderStatus;
  enumKeys = []

  constructor(public service:OrderService,
    public dialog: MatDialog,
    public router: Router,
    public toastr: ToastrService,
    private currentRoute: ActivatedRoute,
    private alertService: AlertService) {
      this.enumKeys=Object.keys(this.orderStatus);
     }

  ngOnInit(): void {
    
    let orderId = this.currentRoute.snapshot.paramMap.get('id');
    if(orderId == null)
    this.resetForm();
    else { 
      this.service.getOrderById(orderId)
      .pipe(first())
      .subscribe(order => this.service.formData = order);
      //.then(res => {
     // this.service.formData = res.ponuda;
     // this.service.formData.Datum = res.ponuda.Datum;
      //this.service.stavkePonude = res.ponudaDetails;
  // });
 
  }
}
  resetForm(form?:NgForm){
    if(form=null)
    form.resetForm();
    this.service.formData = {
      OrderId: 0,
      DateCreated: new Date(),
      DateUpdated: null,
      GTotal: 0,
      Status: OrderStatus.Created,
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
      
      this.submitted = true;

        this.alertService.clear();

        if (form.invalid) {
          return;
        }

        this.loading = true;
        this.service.saveOrder()
          .pipe(first())
          .subscribe({
            next: () => {
              this.alertService.success('Orded is added', { keepAfterRouteChange: true });
              this.router.navigate(['/orders']);
            },
            error: error => {
              this.alertService.error(error);
              this.loading = false;
            }
          });
    } 
  }
}
