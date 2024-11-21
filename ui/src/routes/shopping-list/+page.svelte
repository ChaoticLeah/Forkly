<script lang="ts">
	import { fetchShoppingList } from '$lib/backend';
	import Header from '$lib/components/Header.svelte';
	import Ingredients from '$lib/components/recipePage/Ingredients.svelte';
	import ShoppingListIngredients from '$lib/components/ShoppingListIngredients.svelte';
	import { read, STORAGE_KEYS } from '$lib/storage';
	import { pageTitle } from '$lib/title.svelte';

	// let shoppingList: Ingredient[] = $state([]);

	// fetchShoppingList(read(STORAGE_KEYS.SHOPPING_LIST) as string[]).then((data) => {
	// 	shoppingList = data as Ingredient[];
	// });

	console.log('Shopping list page');
	pageTitle.name = 'Shopping list';
</script>

<div class="container mx-auto max-w-screen-lg px-4">
	<div class="flex flex-col gap-4">
		<Header
			items={[
				{ href: '/', text: 'Home' },
				{ href: '/shopping-list', text: 'Shopping list' }
			]}
		/>
		<ShoppingListIngredients recipe={{ ingredients: [] }} />

		<h1 class="text-xl font-semibold">Shopping List</h1>
		<div class="divider" />

		{#await fetchShoppingList(read(STORAGE_KEYS.SHOPPING_LIST) as string[])}
			<span class="loading loading-spinner loading-lg"></span>
		{:then ingredients}
			<Ingredients recipe={{ ingredients: ingredients.INGREDIENTS }} />
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>
</div>
