<script lang="ts">
	import { fetchShoppingList } from '$lib/backend';
	import Header from '$lib/components/Header.svelte';
	import Ingredients from '$lib/components/recipePage/Ingredients.svelte';
	import ShoppingListIngredients from '$lib/components/ShoppingListIngredients.svelte';
	import { clearStorage, read, STORAGE_KEYS } from '$lib/storage';
	import { pageTitle } from '$lib/title.svelte';

	function clearShoppingList() {
		let confirm = window.confirm('Are you sure you want to clear the shopping list?');
		if (confirm) {
			clearStorage(STORAGE_KEYS.SHOPPING_LIST);
			location.reload();
		}
	}

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

		{#await fetchShoppingList((read(STORAGE_KEYS.SHOPPING_LIST) || []) as string[])}
			<div class="divider" />
			<span class="loading loading-spinner loading-lg"></span>
		{:then ingredients}
			<span class="text-sm italic opacity-50">Showing ingredients for:</span>
			<div class="flex gap-1 flex-wrap">
				{#each ((read(STORAGE_KEYS.SHOPPING_LIST) || []) as string[]) as recipe}
					<div class="badge badge-info gap-2">
						<a href='/?dir={recipe}'>{recipe.split('/').pop()}</a>
					</div>
				{/each}
			</div>

			<div class="divider" />

			{#if ingredients.INGREDIENTS.length === 0}
				<p class="text-center">No items in the shopping list</p>
			{:else}
				<Ingredients recipe={{ ingredients: ingredients.INGREDIENTS }} />
			{/if}
		{:catch error}
			<div class="divider" />

			<p>{error.message}</p>
		{/await}

		<button class="btn btn-primary" onclick={clearShoppingList}>Clear shopping list</button>
	</div>
</div>
