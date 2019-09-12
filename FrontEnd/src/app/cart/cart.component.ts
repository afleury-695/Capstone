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
        }, 2500); 
      },
      err => { 
        console.log(err)
      }
    );
  }
onRemoveItemFromCart(i: number) { 
  this.cartService.deleteItemByIndex(i);
  this.getItemsInCart();
}
}

  // ngOnInit() {
  //   this.getItemsInCart();
  //   this.calculateTotal();
  // }

  // onRemoveItemFromCart(index: number) { 
  //   this.cartService.removeItemFromCart(index);
  //   this.getItemsInCart();
  //   this.calculateTotal();
  // }
  // getItemsInCart() { 
  //   this.itemsInCart = this.cartService.getItemsInCart();
  // }
  // onPurchase() { 
  //   this.cartService.purchase(this.itemsInCart).subscribe(
  //     (res: any) => { 
  //       this.cartService.emptyCart();
  //       this.itemsInCart = []; 
  //       this.infoText = "You've bought your items! Redirecting you in 3...2...1..";

  //       setTimeout(() => { 
  //         this.router.navigate["/items"];
  //       }, 1500);
  //     }
  //   );
  // }
  // calculateTotal() { 
  //   this.total = this.itemsInCart.reduce(total, currVal) => total + (currVal.price), 0);
  // }
  
