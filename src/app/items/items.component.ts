import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import {ItemService} from "src/app/_services/item.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: []
})
export class ItemsComponent implements OnInit {

  itemsList = null;
  term: string;
    constructor(public itemService:ItemService,
      private router: Router,
      private toastr: ToastrService) { }
  
    ngOnInit(): void {
      this.itemService.getItemsList()
            .pipe(first())
            .subscribe(items => this.itemsList = items);
    }
  
    openForEdit(itemId: number){
      this.router.navigate(['/item/' + itemId]);
    }
  
    refreshList() {
      this.itemsList = this.itemService.getItemsList();
    }
  
    onItemDelete(id: number) {
      if (confirm('Are you sure you want to delete this item?')){
        const item = this.itemsList.find(x => x.ItemId === id);
        item.isDeleting = true;
        this.itemService.deleteItem(id)
            .pipe(first())
            .subscribe(() => this.itemsList = this.itemsList.filter(x => x.ItemId !== id));
      }
    }
}