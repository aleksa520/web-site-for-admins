// Here sholud be mapped all fields from backend domain classes 
export class Order {
    OrderId: number;
    DateCreated: Date;
    DateUpdated?: Date;
    GTotal: number;
    Status: OrderStatus;
    DeletedItemsIDs: string;
}

export enum OrderStatus
{
  Created = "Created",
  Processing = "Processing",
  Confirmed = "Confirmed",
  Updated = "Updated",
  Shipped = "Shipped",
  Closed = "Closed"
}
