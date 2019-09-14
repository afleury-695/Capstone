import { Component, OnInit, Input } from '@angular/core';
import { Item, ItemsService } from "src/app/items.service";
import { CartService } from 'src/app/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.scss']
})
export class ShoppingCardComponent implements OnInit {

  @Input()item: Item;
  buttonText = "Add to Cart";
  @Input() i: number; 
  qtyToPurchase: number;

  constructor(private cartService: CartService, private router: Router, private itemsService: ItemsService) { }

  onAddToCart(item: Item, qty: number) { 
    if(this.qtyToPurchase > 0 && this.qtyToPurchase <= item.quantity) { 
      this.itemsService.getItems();
      this.cartService.addToCart(item, this.qtyToPurchase);
      this.buttonText = "Added!";

      setTimeout(() => { 
        this.buttonText = "Add to Cart";
      }, 1500);
    }
  }

  // OnInitTax(item: Item[]) { 
  //   this.cartService.updateTax(item);
  // }

  OnInitTax(item: Item) { 
    this.cartService.updateTax(item).subscribe(
      (res: any) => { 
        console.log("Went through"); 
      },
      err => { 
        console.log(err)
      }
    );
  }

  // setQtyToPurchase(item: Item, qty: number) { 
  //   this.qtyToPurchase = this.qtyToPurchase; 
  // }
  ngOnInit() {
  }

}
