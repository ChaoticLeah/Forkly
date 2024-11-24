<script lang="ts">
	import type { Ingredient } from "$lib/cookType";
	import { formatGroupedQuantity, type Quantity } from "$lib/quantity";
	import { read, write, STORAGE_KEYS } from "$lib/storage";
	import { onMount } from "svelte";

	let { recipe = { ingredients: [] } }: { recipe: { ingredients: Ingredient[]} } = $props();
	
	let ingredients: (Ingredient & { crossedOut?: boolean })[] = $state(recipe.ingredients);

	function toggleHasIngredient(ingredient: Ingredient, i: number) {
		let hasList: Record<string, Quantity> = read(STORAGE_KEYS.HAS_LIST) || {};

		if(hasList[ingredient.name]) {
			delete hasList[ingredient.name];
		} else {
			hasList[ingredient.name] = ingredient.quantity;
		}

		ingredients[i].crossedOut = !ingredients[i].crossedOut;

		write(STORAGE_KEYS.HAS_LIST, hasList);
	}

	function hasIngredient(ingredient: Ingredient) {
		let hasList: Record<string, Quantity> = read(STORAGE_KEYS.HAS_LIST) || {};
		//TODO improve this
		if(hasList[ingredient.name]) {
			return true;
		}
	}

	onMount(() => {
		let hasList: Record<string, Quantity> = read(STORAGE_KEYS.HAS_LIST) || {};
		ingredients = ingredients.map(ingredient => {
			ingredient.crossedOut = hasList[ingredient.name] ? true : false;
			return ingredient;
		});
	});
</script>

{#each ingredients as ingredient, i}
	<div class="flex justify-between">
		<button class:line-through={ingredient.crossedOut} onclick={()=>{toggleHasIngredient(ingredient, i)}}>{ingredient.name}</button>
		<span class="opacity-50">{formatGroupedQuantity(ingredient.quantity)}</span>
	</div>
{/each}