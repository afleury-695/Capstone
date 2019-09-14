import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Item } from '../items.service';
import { ItemsService } from '../items.service';




@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  allItems: Item[] = [];

  searchTerm = "";
  getSub: Subscription;

  constructor(private itemService: ItemsService) { }

  ngOnInit() {
    this.getItems();

  }

  ngOnDestroy() { 
    if(this.getSub) { 
      this.getSub.unsubscribe();
    }
  }

  getItems() { 
    this.getSub = this.itemService.getItems().subscribe(
      (res: any) => {
        this.allItems = res; 
      },
      err => {  
        console.log(err);
      }
    )
  }
}
