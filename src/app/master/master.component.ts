import { Component, OnInit } from '@angular/core';

import { InventoryService } from '../shared/inventory.service';
import { InventoryItem } from '../shared/inventoryItem.model';
import { Router } from '@angular/router';
import { LoggingService } from '../shared/logging.service'

@Component({
	selector: 'app-master',
	templateUrl: './master.component.html',
	styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

	SORTKEY_NAME = "name"
	SORTKEY_DESCRIPTION = "description"
	SORTKEY_CATEGORY = "category"
	SORTKEY_LOCATION = "location"
	SORTKEY_RATING = "rating"
	ORDER_ASCENDING = 0;
	ORDER_DESCENDING = 1;
	sortKey = this.SORTKEY_NAME
	orderDirection = this.ORDER_ASCENDING
	sortOnName = true;
	sortOnDescription = false;
	sortOnCategory = false
	sortOnLocation = false
	sortOnRating = false;
	sortStates = {
		name: 0,
		description: 0,
		category: 0,
		location: 0,
		rating: 0
	}

	showConfirmationModal = false


	inventoryItemList: InventoryItem[];

	constructor( 	private inventoryService: InventoryService, 
		private router: Router,
		private loggingService: LoggingService
		) { }

	ngOnInit() {
		this.fetchData()
	}

	askDeleteAllRecords() {
		this.showConfirmationModal = true
	}

	doNotDeleteAllRecords() {
		this.showConfirmationModal = false
	}

	doDeleteAllRecords() {
		this.showConfirmationModal = false
		for (var i = 0; i < this.inventoryItemList.length; i++) {
			let item = this.inventoryItemList[i] as InventoryItem
			this.inventoryService.deleteInventoryItem(item.$key)
		}	
	}

	addSampleRecords() {
		this.inventoryService.addSampleRecords()
	}

	fetchData() {
		var x = this.inventoryService.getData();
		x.snapshotChanges().subscribe(item => {
			this.inventoryItemList = [];
			item.forEach(element => {
				var y = element.payload.toJSON();
				y["$key"] = element.key;
				this.inventoryItemList.push(y as InventoryItem);
			});
			if (this.orderDirection == this.ORDER_ASCENDING) {
				this.sortByKeyAscending(this.inventoryItemList, this.sortKey)
			} else {
				this.sortByKeyDescending(this.inventoryItemList, this.sortKey)
			}
		});
	}

	setSortKey(value) {
		if (value === this.sortKey) {
			this.toggleOrderBy(value)
			this.orderDirection = this.sortStates[value]
		} else {
			this.sortOnName = false;
			this.sortOnDescription = false;
			this.sortOnCategory = false
			this.sortOnLocation = false
			this.sortOnRating = false;
			this["sortOn" + value] = true;
			this.sortKey = value
			this.inventoryService.sortKey = this.sortKey
		}

		this.fetchData()
	}


	sortByKeyAscending(array, key) {
		return array.sort(function(a, b) {
			var x = a[key]; var y = b[key];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}

	sortByKeyDescending(array, key) {
		return array.sort(function(a, b) {
			var x = a[key]; var y = b[key];
			return -1 * ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}

	toggleOrderBy(value) {
		this.sortStates[value] = (1 - this.sortStates[value])
	}

	getHeaderClass(value) {
		let result
		if (value == this.sortKey) {
			result = "selectedTh"
		}
		return result
	}

	getSortCaretClass(whichOne) {
		let result
		switch(whichOne) {
			case this.SORTKEY_NAME:
			result = this.sortStates[this.SORTKEY_NAME] === 0 ? "fa fa-caret-down" : "fa fa-caret-up"
			break;
			case this.SORTKEY_DESCRIPTION:
			result = this.sortStates[this.SORTKEY_DESCRIPTION] === 0 ? "fa fa-caret-down" : "fa fa-caret-up"
			break;
			case this.SORTKEY_CATEGORY:
			result = this.sortStates[this.SORTKEY_CATEGORY] === 0 ? "fa fa-caret-down" : "fa fa-caret-up"
			break;
			case this.SORTKEY_LOCATION:
			result = this.sortStates[this.SORTKEY_LOCATION] === 0 ? "fa fa-caret-down" : "fa fa-caret-up"
			break;
			case this.SORTKEY_RATING:
			result = this.sortStates[this.SORTKEY_RATING] === 0 ? "fa fa-caret-down" : "fa fa-caret-up"
			break;
		}
		return result
	}

	makeInitialCase(value) {
		return value.charAt(0).toUpperCase() + value.slice(1);
	}

	onAdd() {
		this.router.navigate(['detail']);
	}

	onEdit(inventoryItem?: InventoryItem) {
		this.inventoryService.selectedInventoryItem = Object.assign({}, inventoryItem);
		if (inventoryItem) {
			this.router.navigate(['detail', inventoryItem.$key]);
		} else {
			this.router.navigate(['detail']);
		}
	}

	onDelete(key: string) {
		// Leaving this in as an example of how to confirm user action WITHOUT a custom modal
		if (confirm('Are you sure to delete this record ?') == true) {
			this.inventoryService.deleteInventoryItem(key);
		}
	}

}



