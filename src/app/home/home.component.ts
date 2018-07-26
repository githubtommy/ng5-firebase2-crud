import { Component, OnInit } from '@angular/core';

import { InventoryService } from '../shared/inventory.service';
import { InventoryItem } from '../shared/inventoryItem.model';
import { Router } from '@angular/router';
import { LoggingService } from '../shared/logging.service'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

	inventoryItemList: InventoryItem[];
	constructor( 	
		private inventoryService: InventoryService, 
		private router: Router,
		private loggingService: LoggingService
		) { }

	ngOnInit() {
		this.loggingService.info("ngIOnInit — this is an example of an 'info' loggingService message")
		this.loggingService.warn("ngIOnInit — this is an example of an 'warn' loggingService message")
		this.loggingService.error("ngIOnInit — this is an example of an 'error' loggingService message")
	}

	goToList() {
		this.router.navigate(['master']);
	}

}



