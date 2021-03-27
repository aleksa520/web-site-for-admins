import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '@app/_services/customerorder.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: []
})
export class OrdersComponent implements OnInit {


  ordersList;
  term: string;
    constructor(public orderService:OrderService,
      private router: Router,
      private toastr: ToastrService,) { }
  
    ngOnInit(): void {
      this.refreshList();
    }
  
   
    refreshList() {
     this.ordersList = this.orderService.getOrdersList();
    }
  
    onOrderDelete(id: number) {
      
      if (confirm('Are you sure you want to delete this order?')) {
        this.orderService.delete(id);
         this.refreshList();
          this.toastr.warning("Order deleted successfully!");
      }
      
    }

}
