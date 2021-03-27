import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ItemService} from "src/app/_services/item.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: []
})
export class ItemsComponent implements OnInit {

  itemsList;
  term: string;
    constructor(public itemService:ItemService,
      private router: Router,
      private toastr: ToastrService) { }
  
    ngOnInit(): void {
      this.refreshList();
    }
  
    openForEdit(itemId: number){
      this.router.navigate(['/item/' + itemId]);
    }
  
    refreshList() {
      this.itemsList = this.itemService.getItemsList();
    }
  
    onItemDelete(id: number) {
      if (confirm('Are you sure you want to delete this item?')) {
        this.itemService.deleteItem(id);
         this.refreshList();
          this.toastr.warning("Item deleted successfully!");
      }
    }

}
