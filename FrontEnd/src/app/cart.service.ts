import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../app/items.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemsInCart: Item[] = [];
  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }
  
    addItemToCart(item: Item, qty: number) { 
      let itemAlreadyInCart = false; 
      this.itemsInCart = this.itemsInCart.map(i => { 
        if(i.id == item.id) { 
          i.quantity += qty; 
          itemAlreadyInCart = true; 
        }
        return i; 
      }); 
      if(!itemAlreadyInCart) { 
        const newItem = new Item(item.id, item.name, item.price, item.isImported, item.category, item.quantity, item.image);
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
      return this.http.post<null>(url, item);
    }
  }
