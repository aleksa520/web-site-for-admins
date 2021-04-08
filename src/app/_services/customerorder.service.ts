import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from "src/app/_models/customerorder.model";
import { OrderItem } from "src/app/_models/order-item.model";
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formData;
  orderItems: OrderItem[];
  DeletedOrderItemIds: string;
  RemoveItems: string[];
  hasOrderItems:boolean = false;
  constructor(public http: HttpClient) { }

  saveOrder() {


    if(this.formData.OrderId == 0)
    {
      var order = {
        DateCreated: this.formData.DateCreated,
        DateUpdated: null,
        GTotal: this.formData.GTotal,
        Status: this.formData.Status,
        OrderItems: this.orderItems
      };
      
      return this.http.post(`${environment.apiUrl}/order`, order);

    }else
    {
      var orderToUpdate = {
        OrderId: this.formData.OrderId,
        DateCreated: this.formData.DateCreated,
        DateUpdated: new Date(),
        GTotal: this.formData.GTotal,
        Status: this.formData.Status,
        OrderItems: this.orderItems,
        DeletedOrderItemIDs: this.DeletedOrderItemIds
      };
      
      return this.http.put(`${environment.apiUrl}/order`, orderToUpdate);
    }

  }

  getOrderById(id: string) {
    return this.http.get<Order>(`${environment.apiUrl}/orders/${id}`);
  }

  getOrdersList() {
    return this.http.get<Order>(`${environment.apiUrl}/orders`);
  }

  delete(id: string) {
    return this.http.delete<Order>(`${environment.apiUrl}/orders/${id}`);
  }

}

