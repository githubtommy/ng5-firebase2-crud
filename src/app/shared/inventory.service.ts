import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { InventoryItem} from './inventoryItem.model';
import { StaticDataService } from './static-data.service'

@Injectable()

export class InventoryService {
  inventoryList: AngularFireList<any>;
  // inventoryItemList: InventoryItem[];
  tempVar: string
  selectedInventoryItem: InventoryItem = new InventoryItem();
  sortKey: string = "name"
  constructor(private firebase :AngularFireDatabase, private staticDataService: StaticDataService ) { }

  addSampleRecords() {
    let sampleData = this.staticDataService.sampleData
    for (var i = 0; i < sampleData.length; i++) {
      let item = sampleData[i] as InventoryItem
      this.insertInventoryItem(item)
    }
  }

  getData(){
    this.inventoryList = this.firebase.list('inventory', ref => ref.orderByChild(this.sortKey));
    return this.inventoryList;
  }

  insertInventoryItem(inventoryItem : InventoryItem) {
    this.inventoryList.push({
      name: inventoryItem.name,
      description: inventoryItem.description,
      category: inventoryItem.category,
      location: inventoryItem.location,
      rating: inventoryItem.rating,
    });
  }

  updateInventoryItem(inventoryItem : InventoryItem) {
    this.inventoryList.update(inventoryItem.$key,
    {
      name: inventoryItem.name,
      description: inventoryItem.description,
      category: inventoryItem.category,
      location: inventoryItem.location,
      rating: inventoryItem.rating
    });
  }

  deleteInventoryItem($key : string){
    this.inventoryList.remove($key);
  }


}