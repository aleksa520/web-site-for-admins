import { HttpClient } from "@angular/common/http";
import { OrderService } from "./customerorder.service"
import { MocksService } from "./mocks.service";

describe('OrderService', () =>{
    let service: OrderService;

    beforeEach(() => {
        let http: HttpClient;
        let mock: MocksService;
        service = new OrderService(http,mock);
    })

    it('should have no order items to start', () =>{
        expect(service.orderItems).toBeUndefined();
    })
})