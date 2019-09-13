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

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.getItemsInCart();
    this.calculateTotal();
  }
  getItemsInCart() { 
    this.itemsInCart = this.cartService.getItemsInCart();
  }
  onPurchase() { 
    this.cartService.purchase(this.itemsInCart).subscribe(
      (res: any) => { 
        this.cartService.emptyCart();
        this.itemsInCart = [];

        this.infoText = "You bought this stuff! We're gonna send you back now so you can buy more! Happy shopping!";

        setTimeout(() => { 
          this.router.navigate(["/items"])
        }, 2000); 
      },
      err => { 
        console.log(err)
      }
    );
  }

  calculateTotal() { 
    this.total = this.itemsInCart.reduce((total, currVal) => total + (currVal.price * currVal.quantity), 0)
  }

  onDecreaseQuantity(item: Item) { 
    if(item.quantity > 0) { 
      item.quantity--; 
      this.calculateTotal(); 
    }
  }

  onIncreaseQty(item: Item) { 
    //go back and fix this to work with item.quantity == item.available
    if(item.quantity < 700) { 
      item.quantity++; 
      this.calculateTotal(); 
    }
  }

  onRemoveItemFromCart(i: number) { 
  this.cartService.deleteItemByIndex(i);
  this.getItemsInCart();
  this.calculateTotal();
}
}

  
