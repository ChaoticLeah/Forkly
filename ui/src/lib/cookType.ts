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
	quantity: {
		unit: "hours" | "minutes" | "seconds",
		value: {
		  type: "number" | "range",
		  value: {
			type: "regular",
			value: number,
		  },
		},
	};
}

export function convertTimerToSeconds(timer: Timer) {
	const { unit, value } = timer.quantity;
	switch (unit) {
		case "hours":
			return value.value.value * 3600;
		case "minutes":
			return value.value.value * 60;
		case "seconds":
			return value.value.value;
	}
}

export interface Step {
	items: { type: string; value?: string; index?: number }[];
}
