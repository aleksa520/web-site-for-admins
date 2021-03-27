export class Item {
    ItemId: number;
    Name: string;
    VAT:number;
    UnitMeasure:string;
}

enum UnitMeasure {
    Up = 1,
    Down,
    Left,
    Right,
  }
