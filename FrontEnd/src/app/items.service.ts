import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//creating the item class
export class Item { 
  id: number; 
  name: string; 
  price: number; 
  isImported: boolean; 
  category: string; 
  quantity: number; 
  image: string; 

  constructor(id: number, name: string, price: number, isImported: boolean, category: string, quantity: number, image: string){
    this.id = id; 
    this.name = name; 
    this.price = price; 
    this.isImported = isImported; 
    this.category = category; 
    this.quantity = quantity; 
    this.image = image; 
  }
} 

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  //GET (all)
  getItems(): Observable<Item[]> { 
    const url = "http://localhost:8080/items";
    // const url = `${this.apiUrl}/items`;
    return this.http.get<Item[]>(url);
  }

  //DELETE
  deleteItem(id: number): Observable<Item> { 
    const url= `${this.apiUrl}/items/${id}`;
    return this.http.delete<Item>(url);
  }

  //POST
  addItem(item: Item): Observable<Item> { 
    const url = `${this.apiUrl}/items`;
    return this.http.post<Item>(url, item);
  }

  //PUT
  updateItem(id: number, item: Item): Observable<Item> { 
    const url = `${this.apiUrl}/items/${id}`;
    return this.http.put<Item>(url, item);
  }

  
}
