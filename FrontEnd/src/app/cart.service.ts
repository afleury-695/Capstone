import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../app/items.service';
import { Observable } from 'rxjs';
import { CartComponent } from './cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemsInCart: Item[] = [];
  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }
  
    addToCart(item: Item, qty: number) { 
      let itemAlreadyInCart = false; 
      item.quantity = qty; 
      this.itemsInCart = this.itemsInCart.map(i => { 
        if(i.id == item.id) { 
          item.quantity = qty; 
          itemAlreadyInCart = true; 
        }
        return i; 
      }); 
      if(!itemAlreadyInCart) { 
        const newItem = new Item(item.id, item.name, item.price, item.isImported, item.category, item.quantity, item.image, item.available, item.qtyToPurchase, item.salesTax, item.importTax);
        newItem.id = item.id; 
        this.itemsInCart.push(newItem);
      }
    }

    getItemsInCart(): Item[] { 
      return this.itemsInCart; 
    }
    deleteItemByIndex(i: number) { 
      this.itemsInCart.splice(i, 1);
    }
    emptyCart() { 
      this.itemsInCart = [];
    }
    purchase(item: Item[]): Observable<null> {
      const url = `${this.apiUrl}/purchase`;
  
      console.log(item);
      return this.http.post<null>(url, item);
      
    }
    // posting the tax to the database on adding to cart
    updateTax(item: Item): Observable<null> {
      const url = `${this.apiUrl}/taxed`;
      console.log(item);
      return this.http.post<null>(url, item);
    }

  }
