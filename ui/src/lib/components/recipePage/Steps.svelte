<script lang="ts">
	import type { Cookware, Ingredient, Step, Timer } from '$lib/cookType';
	import { formatGroupedQuantity, formatQuantity, type Quantity } from '$lib/quantity';

	let {
		recipe
	}: {
		recipe: {
			sections: { steps: Step[] }[];
			ingredients: Ingredient[];
			cookware: Cookware[];
			timers: Timer[];
		};
	} = $props();

	function formatText(item: Step['items'][0]) {
		return item.value;
	}

	function formatIngredient(ingredient: Ingredient) {
		return ingredient.name;
	}

	function formatCookware(cookware: Cookware) {
		return cookware.name;
	}

	function formatTimer(timer: Timer | Ingredient) {
		if (!('quantity' in timer)) {
			return (timer as Timer).name;
		} else {
			return formatQuantity((timer as Ingredient).quantity as Quantity);
		}
	}

	function parseStep(
		items: Step['items'],
		ingredients: Ingredient[],
		cookware: Cookware[],
		timers: Timer[]
	) {
		return items.map((item: any) => {
			switch (item.type) {
				case 'ingredient':
                    return `${formatIngredient(ingredients[item.index])} <span class="opacity-50">(${formatQuantity(ingredients[item.index].quantity)})</span>`
					// return formatIngredient(ingredients[item.index]);
				case 'cookware':
					return formatCookware(cookware[item.index]);
				case 'text':
					return formatText(item);
				case 'timer':
					return formatTimer(timers[item.index]);
				default:
					throw new Error(`Unrecognizable item type ${item.type}`);
			}
		}).join('');
	}
</script>

<ul>
	{#each recipe.sections[0].steps as step, index}
		<li>
            <div class="flex flex-col space-y-2 py-4">
                <h2 class="text-xl font-semibold">
                    Step {index + 1}:
                </h2>
                <span>
                    {@html parseStep(step.items, recipe.ingredients, recipe.cookware, recipe.timers)}
                </span>
            </div>
		</li>
	{/each}
</ul>
