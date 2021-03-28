export class Order {
    OrderId: number;
    DateCreated: Date;
    DateUpdated?: Date;
    GTotal: number;
    Status: OrderStatus;
    DeletedItemsIDs: string;
}

enum OrderStatus
{
  CREATED,
  PROCESSING,
  CONFIRMED,
  UPDATED,
  SHIPPED,
  CLOSED
}
