import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { OrderItem } from 'src/app/_models/order-item.model';
import {ItemService} from "src/app/_services/item.service";
import {Item} from 'src/app/_models/item.model';
import { NgForm } from '@angular/forms';
import {OrderService} from 'src/app/_services/customerorder.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: []
})
export class OrderItemsComponent implements OnInit {
formData: OrderItem;
itemList: Item[];
isValid: boolean = true;
constructor(
  @Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<OrderItemsComponent>,
  public ItemService: ItemService,
  public orderService: OrderService
 ) { }

  ngOnInit(): void {

this.itemList = this.ItemService.getItemsList();
if (this.data.orderItemIndex == null)
    this.formData = {
      OrderItemId: null,
      OrderId: this.data.OrderId,
      ItemId: 0,
      Price: 0,
      Quantity: 0,
      Total: 0
    } 
    else
    this.formData = Object.assign({}, this.orderService.orderItems[this.data.orderItemIndex]);
  }
  updatePrice(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.formData.Price = 0;
    }
    else {
      this.formData.Price = this.itemList[ctrl.selectedIndex - 1].Price;
    }
    this.updateTotal();
  }

  updateTotal() {
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if(this.validateForm(form.value)){
         if (this.data.orderItemIndex == null)
           this.orderService.orderItems.push(form.value);
         else
           this.orderService.orderItems[this.data.orderItemIndex] = form.value;
         this.dialogRef.close();
    }
     }

  validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.ItemId == 0)
      this.isValid = false;
    else if (formData.Quantity == 0)
      this.isValid = false;
    return this.isValid;
  }

}
