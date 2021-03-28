import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MocksService } from './mocks.service';
import { Order } from "src/app/_models/customerorder.model";
import { OrderItem } from "src/app/_models/order-item.model";
import { OrderItemPOST } from "src/app/_models/order-itemPOST.model";
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formData: Order;
  orderItems: OrderItem[];
  orderItemsPOST: OrderItemPOST[];
  DeletedOrderItemIds: string;
  RemoveItems: string[];

  constructor(public http: HttpClient,
    public mock:MocksService) {}

 saveOrder() {

  var order = {
    OrderId:0,
    DateCreated: this.formData.DateCreated,
    DateUpdated: this.formData.DateUpdated,
    GTotal: this.formData.GTotal,
    Status: this.formData.Status,
    OrderItems: this.orderItems,
    DeletedOrderItemIDs: this.DeletedOrderItemIds
  };
   
   this.mock.saveOrder(order as unknown as Order);
  
  }


  createOrderItemsList(orderItems: OrderItem[])
  {  
   this.DeletedOrderItemIds = this.formData.DeletedItemsIDs;
   this.RemoveItems = this.formData.DeletedItemsIDs.split(',');
   for(let i = 0; i < this.orderItems.length; i++){
    if(!this.RemoveItems.includes(this.orderItems[i].ItemId.toString()))
    {
     this.orderItemsPOST.push({ItemId : parseInt(this.orderItems[i].ItemId.toString()),
       Quantity: parseInt(this.orderItems[i].Quantity.toString())});
     }
  }

  return this.orderItemsPOST;
}

  getOrdersList()
{
   return this.mock.ordersList;
}

delete(id : number)
{
  this.mock.removeOrder(id);
}

}

