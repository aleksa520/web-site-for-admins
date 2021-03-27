import { Injectable } from '@angular/core';
import { Order } from "src/app/_models/customerorder.model";
import { OrderItem } from "src/app/_models/order-item.model";
import { Item } from "src/app/_models/item.model";
@Injectable({
  providedIn: 'root'
})
export class MocksService {
  
static itemsList: Item[];
static orderItemsList: OrderItem[];
static ordersList: Order[];
itemToDelete: Item;

  constructor() { }

   itemsList: Item[] = [
    {ItemId:1,Name:"Coca Cola", UnitMeasure:"l",VAT:0.1},
    {ItemId:2,Name:"Pepsi", UnitMeasure:"l",VAT:0.2},
    {ItemId:3,Name:"Fanta", UnitMeasure:"l",VAT:0.3}
  ];

  orderItemsList: OrderItem[] = [
    {ItemId:1,OrderId:1,OrderItemId:1,Price:10,Quantity:1,Total:10}
  ];

  ordersList: Order[] = [
   {OrderId:1,DateCreated: new Date('2020,10,10'), DateUpdated:null, GTotal:calculateGTotal(1)}
  ];

  removeItem(index:number){
    this.itemsList = this.itemsList.filter(i=>i.ItemId != index);
  }

  removeOrder(id: number) {
     this.ordersList = this.ordersList.filter(i=>i.OrderId != id);
  }

  addItem(item:Item){
    item.ItemId = this.itemsList.slice(-1)[0].ItemId+1;
    this.itemsList.push(item);
  }

  updateItem(item: Item) {
    this.itemsList.find(i=>i.ItemId == item.ItemId).Name = item.Name;
    this.itemsList.find(i=>i.ItemId == item.ItemId).VAT = item.VAT;
    this.itemsList.find(i=>i.ItemId == item.ItemId).UnitMeasure = item.UnitMeasure;
  }

}
function calculateGTotal(orderId: number): number {
return 10;
}

