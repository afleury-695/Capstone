import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../items.service';
import { ItemsService } from '../items.service';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  allItems: Item[] = [];
  addItemForm = this.fb.group({
    id: [],
    name: [''],
    price: [],
    isImported: [],
    category: [],
    quantity: [],
    image: ['']


  });

  itemIdBeingEdited: number; 
  getSub: Subscription; 
  deleteSub: Subscription; 
  postSub: Subscription; 
  putSub: Subscription; 

  constructor(private itemsService: ItemsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getItems();

  }
  ngOnDestroy() { 
    if(this.getSub) { 
      this.getSub.unsubscribe();
    }
    if(this.deleteSub) { 
      this.deleteSub.unsubscribe();
    }
    if(this.putSub) { 
      this.putSub.unsubscribe();
    }
  }

  getItems() { 
    this.getSub = this.itemsService.getItems().subscribe(
      (res: any) => { 
        this.allItems = res; 
      }
    );
  }

  onDeleteItem(item: Item) { 
    this.deleteSub = this.itemsService.deleteItem(item.id).subscribe( 
      (res: any) => { 
        this.getItems();
      }
    )
  }
  onSubmitForm() { 
    const id = this.addItemForm.value.id; 
    const name = this.addItemForm.value.name; 
    const price = this.addItemForm.value.price; 
    const isImported = this.addItemForm.value.isImported; 
    const category = this.addItemForm.value.category; 
    const quantity = this.addItemForm.value.quantity; 
    const image = this.addItemForm.value.image; 
    const newItem = new Item(id, name, price, isImported, category, quantity, image);

    //new items 
    if(this.itemIdBeingEdited == undefined) { 
      this.postSub = this.itemsService.addItem(newItem).subscribe(
        (res: any) => { 
          this.getItems();
          this.addItemForm.reset();
        }
      )
    } else { 
      newItem.id = this.itemIdBeingEdited; 
      this.putSub = this.itemsService.updateItem(this.itemIdBeingEdited, newItem).subscribe(
        (res: any) => { 
          this.onCancelEditItem();
          this.getItems();
        }
      )
    }
  }

  onStartEditItem(item: Item) { 
    this.itemIdBeingEdited = item.id; 
    this.addItemForm.patchValue(item);
  }

  onCancelEditItem() { 
    this.itemIdBeingEdited = undefined; 
    this.addItemForm.reset();
  }
}
