import { Injectable } from '@angular/core';
import { Item } from "src/app/_models/item.model";
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  formData;

  constructor(private http: HttpClient) {
  }

  getItemById(id: string) {
    return this.http.get<Item>(`${environment.apiUrl}/items/${id}`);
  }

  getItemsList() {
    return this.http.get<Item[]>(`${environment.apiUrl}/items`);
  }

  deleteItem(id: number) {
    return this.http.delete(`${environment.apiUrl}/items/${id}`)
      .pipe(map(x => {
        return x;
      }));
  }

  save() {
    var newItem = {
      VAT: parseFloat(this.formData.VAT.toString()),
      Name: this.formData.Name,
      UnitMeasure: this.formData.UnitMeasure,
      Price: this.formData.Price
    }

    return this.http.post(`${environment.apiUrl}/item`, newItem);
  }


  update() {
    return this.http.put(`${environment.apiUrl}/item/${this.formData.ItemId}`, this.formData)
      .pipe(map(x => {
        return x;
      }));
  }
}