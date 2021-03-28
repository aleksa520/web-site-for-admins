import { Injectable } from '@angular/core';
import { MocksService } from './mocks.service';
import { Item } from "src/app/_models/item.model";
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  formData:Item;

  constructor(public mock:MocksService, private http: HttpClient) { 
  }

  getItemById(id:number):any{
    return this.http.get<Item>(`${environment.apiUrl}/items/${id}`);
  }

getItemsList()
{
  return this.http.get<Item[]>(`${environment.apiUrl}/items`);
}

deleteItem(id : number)
{
  return this.http.delete(`${environment.apiUrl}/items/${id}`)
            .pipe(map(x => {
                return x;
            }));
}

save() {
  var newItem = {
    VAT:  parseFloat(this.formData.VAT.toString()),
    Name: this.formData.Name,
    UnitMeasure: this.formData.UnitMeasure,
    Price: this.formData.Price
  }

  return this.http.post(`${environment.apiUrl}/item`, newItem);
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