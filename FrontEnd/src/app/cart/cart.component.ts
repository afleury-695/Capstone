
//a cart component page 
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../items.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  itemsInCart: Item[] = [];
  total = 0; 
  infoText = "No items in cart."
  apiUrl = ''; 

  sales; 
  imported; 

  itemsWerePurchased = false; 

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.getItemsInCart();
   
    this.calculateTotal();
  }

  //getting all the cart items 
  getItemsInCart() { 
    this.itemsInCart = this.cartService.getItemsInCart();
  }
  //purchasing items
  onPurchase() { 
    this.calculateSales();
    this.calculateImported();
    let itemsWerePurchased = true; 
    this.cartService.purchase(this.itemsInCart).subscribe(
      (res: any) => { 
        this.cartService.emptyCart();
        this.itemsInCart = [];

        this.infoText = "YOUR INVOICE";
      },
      err => { 
        console.log(err)
      }
    );
  }

  //cart totoal
  calculateTotal() { 
    this.total = this.itemsInCart.reduce((total, currVal) => total + (currVal.price * currVal.quantity), 0)
  }

  //sales tax display (pick up sales tax from database, adds it for the quantity, rounds)
  calculateSales() { 
    this.sales = this.itemsInCart.reduce((sales, currVal) => sales + (currVal.salesTax * currVal.quantity), 0)
  }
//same as above for import tax
  calculateImported() { 
    this.imported = this.itemsInCart.reduce((imported, currVal) => imported + (currVal.importTax * currVal.quantity), 0)
  }

//decrease quantity in the cart
  onDecreaseQuantity(item: Item) { 
    if(item.quantity > 0) { 
      item.quantity--; 
     
      this.calculateTotal(); 
    }
  }

  //increase quantity in the cart 
  onIncreaseQty(item: Item) { 
    if(item.quantity < 500) { 
      item.quantity++; 
     
      this.calculateTotal(); 
    }
  }

  //remove items from cart 
  onRemoveItemFromCart(i: number) { 
  this.cartService.deleteItemByIndex(i);
  this.getItemsInCart();

  this.calculateTotal();
}
}