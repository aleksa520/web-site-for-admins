import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '@app/_services/customerorder.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: []
})
export class OrdersComponent implements OnInit {


  ordersList = null;
  term: string;
    constructor(public orderService:OrderService,
      private router: Router,
      private toastr: ToastrService,) { }
  
    ngOnInit(): void {
      this.refreshList();
    }
  
    openForEdit(orderId: string){
      this.router.navigate(['/customerorder/' + orderId]);
    }
    refreshList() {
      this.orderService.getOrdersList()
      .pipe(first())
      .subscribe(i => this.ordersList = i);
    }
  
    onOrderDelete(id: number) {
      
      if (confirm('Are you sure you want to delete this order?')) {
        this.orderService.delete(id.toString())
        .pipe(first())
        .subscribe(() => this.ordersList = this.ordersList.filter(x => x.OrderId !== id));
     
      }
      
    }

}
