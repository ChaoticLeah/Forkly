import type { Quantity } from "./quantity";


export interface Ingredient {
	name: string; // eg. "flour"
    quantity: Quantity;
	// quantity: number; // eg. 200
	// unit: string; // eg. "g"
}

export interface Recipe {
	name: string;
	ingredients: Ingredient[];
}

export interface Cookware {
	name: string;
}

export interface Timer {
	name: string;
	quantity: number;
}

export interface Step {
	items: { type: string; value?: string; index?: number }[];
}
