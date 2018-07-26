import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../shared/inventory.service';
import { InventoryItem } from '../shared/inventoryItem.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule, NgForm} from '@angular/forms';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

	inventoryItemList: InventoryItem[];

	constructor(	
		private inventoryService: InventoryService, 
		private activatedRoute: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		const queryParams = this.activatedRoute.snapshot.queryParams
		const routeParams = this.activatedRoute.snapshot.params;

		if (!routeParams.key) {
			this.resetForm();
			return;
		}

		var x = this.inventoryService.getData();
		x.snapshotChanges().subscribe(item => {
			this.inventoryItemList = [];
			item.forEach(element => {
				var y = element.payload.toJSON();
				y["$key"] = element.key;
				this.inventoryItemList.push(y as InventoryItem);
			});

			var selectedItem = this

			this.inventoryService.selectedInventoryItem
			this.getInventoryItemByKey(routeParams.key);
		});
	}

	goBackToMaster() {
		this.router.navigate(['master']);
	}

	getInventoryItemByKey(key) {
		var result;
		for (var i = 0; i < this.inventoryItemList.length; i++) {
			var item = this.inventoryItemList[i];
			if (item.$key === key) {
				this.inventoryService.selectedInventoryItem = item;
				break;
			}
		}
	}

	onSubmit(inventoryItemForm: NgForm) {		
		if (inventoryItemForm.value.$key == null) {
			this.inventoryService.insertInventoryItem(inventoryItemForm.value);
		}
		else {
			this.inventoryService.updateInventoryItem(inventoryItemForm.value);
		}
		this.resetForm(inventoryItemForm)
		this.goBackToMaster()
	}

	resetForm(inventoryItemForm?: NgForm) {
		if (inventoryItemForm != null) {
			inventoryItemForm.reset();
		}
		this.inventoryService.selectedInventoryItem = {
			$key: null,
			name: '',
			description: '',
			category: '',
			location: '',
			rating: 0
		}
	}
}
