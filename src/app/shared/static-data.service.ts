import { Injectable } from '@angular/core';

@Injectable()
export class StaticDataService {

	testVar:string = "uma"

	public sampleData = [
	{
		name: "Hiking Boots",
		description: "brown, size 12",
		category: "clothing",
		location: "bedroom closet",
		rating: 3
	},
	{
		name: "Atari Flashback 8",
		description: "Game Console",
		category: "toys",
		location: "den",
		rating: 4
	},
	{
		name: "1998 Toyota 4-Runner",
		description: "Old but timeless car-truck",
		category: "cars",
		location: "garage",
		rating: 5
	},
	{
		name: "Uma",
		description: "Dachshund",
		category: "pets",
		location: "house",
		rating: 5
	},
	{
		name: "Dad's Pen Knife",
		description: "brown with broken blade",
		category: "memorabilia",
		location: "dresser drawer",
		rating: 5
	}


	]

	constructor() { }

}
