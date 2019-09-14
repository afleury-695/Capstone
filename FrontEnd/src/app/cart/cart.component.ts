//go remove extra text from the bottom here


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

  sales = 0; 
  imported = 0; 

  itemsWerePurchased = false; 

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.getItemsInCart();
    this.calculateImported();
    this.calculateSales();
    this.calculateTotal();
  }
  getItemsInCart() { 
    this.itemsInCart = this.cartService.getItemsInCart();
  }
  onPurchase() { 
    let itemsWerePurchased = true; 
    this.cartService.purchase(this.itemsInCart).subscribe(
      (res: any) => { 
        this.cartService.emptyCart();
        this.itemsInCart = [];

        this.infoText = "Invoice: ";

        // setTimeout(() => { 
        //   this.router.navigate(["/items"])
        // }, 2000); 
      },
      err => { 
        console.log(err)
      }
    );
  }

  calculateTotal() { 
    this.total = this.itemsInCart.reduce((total, currVal) => total + (currVal.price * currVal.quantity), 0)
  }

  calculateSales() { 
    this.sales = this.itemsInCart.reduce((sales, currVal) => sales + (currVal.salesTax * currVal.quantity), 0)
  }

  calculateImported() { 
    this.imported = this.itemsInCart.reduce((imported, currVal) => imported + (currVal.importTax * currVal.quantity), 0)
  }


  onDecreaseQuantity(item: Item) { 
    if(item.quantity > 0) { 
      item.quantity--; 
      this.calculateImported();
      this.calculateSales();
      this.calculateTotal(); 
    }
  }

  onIncreaseQty(item: Item) { 
    //go back and fix this to work with item.quantity == item.available
    if(item.quantity < 500) { 
      item.quantity++; 
      this.calculateImported();
      this.calculateSales();
      this.calculateTotal(); 
    }
  }

  onRemoveItemFromCart(i: number) { 
  this.cartService.deleteItemByIndex(i);
  this.getItemsInCart();
  this.calculateImported();
  this.calculateSales();
  this.calculateTotal();
}
}

  
