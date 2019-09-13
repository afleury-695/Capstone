import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './items.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Item[], searchTerm: string): Item[] {
    // return value.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return value.filter((item: Item) => { 
      if(item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) { 
        return true;
      }
      if(item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase())) { 
        return true;
    }
    return false; 
  })
  }
}