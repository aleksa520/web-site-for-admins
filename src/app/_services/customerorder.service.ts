import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MocksService } from './mocks.service';
import { Order } from "src/app/_models/customerorder.model";
import { OrderItem } from "src/app/_models/order-item.model";
@Injectable({
  providedIn: 'root'
})
export class OrderService {

formData: Order;
orderItems: OrderItem[];
DeletedOrderItemIds: string;
RemoveItems: string[];

  constructor(public http: HttpClient,
    public mock:MocksService) {}

 saveOrder() {

  }


  createOrderItemsList(orderItems: OrderItem[])
  {  
 
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

