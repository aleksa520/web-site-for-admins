import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MocksService } from './mocks.service';
import { Order } from "src/app/_models/customerorder.model";
import { OrderItem } from "src/app/_models/order-item.model";
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formData: Order;
  orderItems: OrderItem[];
  DeletedOrderItemIds: string;
  RemoveItems: string[];

  constructor(public http: HttpClient,
    public mock: MocksService) { }

  saveOrder() {

    var order = {
      OrderId: this.mock.ordersList.slice(-1)[0].OrderId + 1,
      DateCreated: this.formData.DateCreated,
      DateUpdated: this.formData.DateUpdated,
      GTotal: this.formData.GTotal,
      Status: this.formData.Status,
      OrderItems: this.orderItems,
      DeletedOrderItemIDs: this.DeletedOrderItemIds
    };
    for (let i = 0; i < this.orderItems.length; i++) {
      this.orderItems[i].OrderItemId = i + 1;
      this.orderItems[i].OrderId = order.OrderId;
    }
  //  this.mock.saveOrder(order as unknown as Order);
   // this.mock.saveOrderItems(this.orderItems as unknown as OrderItem[]);
   return this.http.post(`${environment.apiUrl}/order`, order);
  }

 getOrderById(id:string){
  return this.http.get<Order>(`${environment.apiUrl}/orders/${id}`);
 }

  getOrdersList() {
    return this.http.get<Order>(`${environment.apiUrl}/orders`);
  }

  delete(id: number) {
    this.mock.removeOrder(id);
  }

}

