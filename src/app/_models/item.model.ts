export class Item {
    ItemId: number;
    Name: string;
    VAT:number;
    UnitMeasure:UnitMeasure;
    Price:number;
}

export enum UnitMeasure
{
  L = "L",
  KG = "KG",
  G = "G"
}
