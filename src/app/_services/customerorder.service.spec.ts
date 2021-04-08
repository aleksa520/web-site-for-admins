import { HttpClient } from "@angular/common/http";
import { OrderService } from "./customerorder.service"

describe('OrderService', () =>{
    let service: OrderService;

    beforeEach(() => {
        let http: HttpClient;
        service = new OrderService(http);
    })

    it('should have no order items to start', () =>{
        expect(service.orderItems).toBeUndefined();
    })
})