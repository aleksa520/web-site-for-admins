import { Injectable } from '@angular/core';
import { MocksService } from './mocks.service';
import { Item } from "src/app/_models/item.model";
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  formData:Item;

  constructor(public mock:MocksService) { }

  getItemById(id:number):any{
    return this.mock.itemsList.find(i=>i.ItemId == id);
  }

getItemsList()
{
 return this.mock.itemsList;
}

deleteItem(id : number)
{
    this.mock.removeItem(id);
}

save() {

  var newItem = {
    VAT:  parseFloat(this.formData.VAT.toString()),
    Name: this.formData.Name,
    UnitMeasure: this.formData.UnitMeasure,
    Price: this.formData.Price
  }

  this.mock.addItem(newItem as Item);
}


update() {

  var toUpdateItem = {
    ItemId: parseInt(this.formData.ItemId.toString()),
    VAT:  parseFloat(this.formData.VAT.toString()),
    Name: this.formData.Name,
    UnitMeasure: this.formData.UnitMeasure
  }

  this.mock.updateItem(toUpdateItem as Item);
}

}