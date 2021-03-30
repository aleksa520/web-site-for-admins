import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { Order } from '@app/_models/customerorder.model';
/* This is fake backend service created to simulate the http requests. If you want to add
your own backend you sholud remove this class. */
const adminsKey = 'admins';
let admins = JSON.parse(localStorage.getItem(adminsKey)) || [];

const itemsKey = 'items';
let items = JSON.parse(localStorage.getItem(itemsKey)) || [];

const ordersKey = 'orders';
let orders = JSON.parse(localStorage.getItem(ordersKey)) || [];

const orderItemsKey = 'orderItems';
let orderItems = JSON.parse(localStorage.getItem(orderItemsKey)) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/admins/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/admins/register') && method === 'POST':
                    return register();
                case url.endsWith('/admins') && method === 'GET':
                    return getUsers();
                case url.endsWith('/items') && method === 'GET':
                    return getItems();
                case url.endsWith('/item') && method === 'POST':
                    return addItem();
                case url.endsWith('/orderitems') && method === 'GET':
                    return getOrderItems();
                case url.endsWith('/orderitem') && method === 'POST':
                    return addOrderItem();
                case url.endsWith('/orders') && method === 'GET':
                    return getOrders();
                case url.endsWith('/order') && method === 'POST':
                    return addOrder();
                case url.endsWith('/order') && method === 'PUT':
                    return updateOrder();
                case url.match(/\/item\/\d+$/) && method === 'PUT':
                    return updateItem();
                case url.match(/\/admins\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/items\/\d+$/) && method === 'GET':
                    return getItemById();
                case url.match(/\/orders\/\d+$/) && method === 'GET':
                    return getOrderById();
                case url.match(/\/items\/\d+$/) && method === 'DELETE':
                    return deleteItem();
                case url.match(/\/orders\/\d+$/) && method === 'DELETE':
                    return deleteOrder();
                default:
                    return next.handle(request);
            }
        }

        function authenticate() {
            const { username, password } = body;
            const admin = admins.find(x => x.username === username && x.password === password);
            if (!admin) return error('Username or password is incorrect');
            return ok({
                ...basicAdminDetails(admin),
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const admin = body

            if (admins.find(x => x.username === admin.username)) {
                return error('Username "' + admin.username + '" is already taken')
            }

            admin.id = admins.length ? Math.max(...admins.map(x => x.id)) + 1 : 1;
            admins.push(admin);
            localStorage.setItem(adminsKey, JSON.stringify(admins));
            return ok();
        }

        function addOrder() {
            const order = body

            order.OrderId = orders.length ? Math.max(...orders.map(x => x.OrderId)) + 1 : 1;
            orders.push(order);
            localStorage.setItem(ordersKey, JSON.stringify(orders));
            return ok();
        }
        function updateOrder() {
        
            let params = body;
            let order = orders.find(x => x.OrderId == params.OrderId);
            Object.assign(order, params);
            localStorage.setItem(ordersKey, JSON.stringify(orders));
            return ok();
        }

        function addItem() {
            const item = body

            item.ItemId = items.length ? Math.max(...items.map(x => x.ItemId)) + 1 : 1;
            items.push(item);
            localStorage.setItem(itemsKey, JSON.stringify(items));
            return ok();
        }
        function addOrderItem() {
            const item = body

            item.OrderItemId = orderItems.length ? Math.max(...items.map(x => x.ItemId)) + 1 : 1;
            orderItems.push(item);
            localStorage.setItem(orderItemsKey, JSON.stringify(orderItems));
            return ok();
        }
        function deleteItem() {
            items = items.filter(x => x.ItemId !== idFromUrl());
            localStorage.setItem(itemsKey, JSON.stringify(items));
            return ok();
        }
        function deleteOrder() {
            orders = orders.filter(x => x.OrderId !== idFromUrl());
            localStorage.setItem(ordersKey, JSON.stringify(orders));
            return ok();
        }
        function updateItem() {
            let params = body;
            let item = items.find(x => x.ItemId === idFromUrl());

            Object.assign(item, params);
            localStorage.setItem(itemsKey, JSON.stringify(items));

            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(admins.map(x => basicAdminDetails(x)));
        }

        function getItems() {
            if (!isLoggedIn()) return unauthorized();
            return ok(items.map(x => basicItemDetails(x)));
        }

        function getOrders() {
            if (!isLoggedIn()) return unauthorized();
            return ok(orders.map(x => basicOrderDetails(x)));
        }

        function getOrderItems() {
            if (!isLoggedIn()) return unauthorized();
            return ok(orderItems.map(x => basicOrderItemDetails(x)));
        }


        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const admin = admins.find(x => x.id === idFromUrl());
            return ok(basicAdminDetails(admin));
        }

        function getItemById() {
            const item = items.find(x => x.ItemId === idFromUrl());
            return ok(basicItemDetails(item));
        }

        function getOrderById() {
            const order = orders.find(x => x.OrderId === idFromUrl());
            return ok(basicOrderDetails(order));
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorized' } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        function basicAdminDetails(admin) {
            const { id, username, firstName, lastName } = admin;
            return { id, username, firstName, lastName };
        }

        function basicOrderDetails(order) {
            const { OrderId, DateCreated, DateUpdated, GTotal, Status, DeletedItemsIDs } = order;
            return { OrderId, DateCreated, DateUpdated, GTotal, Status, DeletedItemsIDs };

        }

        function basicItemDetails(item) {
            const { ItemId, Name, VAT, UnitMeasure, Price } = item;
            return { ItemId, Name, VAT, UnitMeasure, Price };

        }

        function basicOrderItemDetails(orderItem) {
            const { OrderItemId, OrderId, ItemId, Quantity, Price, Total } = orderItem;
            return { OrderItemId, OrderId, ItemId, Quantity, Price, Total };
        }


        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};






