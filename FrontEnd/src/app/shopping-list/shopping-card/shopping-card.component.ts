import { Component, OnInit, Input } from '@angular/core';
import { Item } from "src/app/items.service";
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.scss']
})
export class ShoppingCardComponent implements OnInit {

  @Input()item: Item;
  buttonText = "Add to Cart";
  @Input() i: number; 
  qtyToPurchase = 1;

  constructor(private cartService: CartService) { }

  onAddToCart(item: Item) { 
    if(this.qtyToPurchase > 0 && this.qtyToPurchase <= item.quantity) { 
      this.cartService.addItemToCart(item, this.qtyToPurchase);
      this.buttonText = "Added!";

      setTimeout(() => { 
        this.buttonText = "Add to Cart";
      }, 1500);
    }
  }

  ngOnInit() {
  }

}
