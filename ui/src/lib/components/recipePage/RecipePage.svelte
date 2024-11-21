<script lang="ts">
	import { fetchRecipe } from '$lib/backend';
	import { onMount } from 'svelte';
	import Ingredients from './Ingredients.svelte';
	import Steps from './Steps.svelte';
	import SelectBar from '../SelectBar.svelte';
	import Cookware from './Cookware.svelte';
	import Icon from '@iconify/svelte';
	import { addToStorage, isItemInStorage, removeFromStorage, STORAGE_KEYS } from '$lib/storage';
	import { success } from '$lib/toast';

	let { recipe = '' } = $props();

	let currentTab = $state('steps');
	let isInShoppingList = $state(isItemInStorage(STORAGE_KEYS.SHOPPING_LIST, recipe));
	
	function toggleInShoppingList() {
		if(isInShoppingList) {
			removeFromStorage(STORAGE_KEYS.SHOPPING_LIST, recipe);
			success('Removed from shopping list');
		} else {
			addToStorage(STORAGE_KEYS.SHOPPING_LIST, recipe);
			success('Added to shopping list');
		}
		isInShoppingList = !isInShoppingList;
	}


</script>

{#await fetchRecipe(recipe)}
	<!-- <p>Loading...</p> -->
	<span class="loading loading-spinner loading-lg"></span>
{:then recipeData}
	<div class="recipe-card">
		<div class="flex justify-between">
			<h1 class="mb-2 text-3xl font-bold">{recipeData.name}</h1>
			<button class="btn btn-circle md:!btn md:!w-fit btn-primary tooltip" data-tip={isInShoppingList ? 'Remove from shopping list': 'Add to shopping list'} onclick={toggleInShoppingList}
				><Icon icon="fluent:task-list-square-add-24-regular" class="btn-primary"/>
				<p class="hidden md:block btn-primary">{isInShoppingList ? 'Remove from shopping list': 'Add to shopping list'}</p>
			</button>
		</div>

		{#if recipeData.metadata.author}
			{#if recipeData.metadata.author.url}
				<a href={recipeData.metadata.author.url} target="_blank" rel="noopener noreferrer">
					<p class="text-sm italic opacity-50">
						by {JSON.stringify(recipeData.metadata.author.name)}
					</p>
				</a>
			{:else}
				<p class="text-sm italic opacity-50">
					by {JSON.stringify(recipeData.metadata.author.name)}
				</p>
			{/if}
		{/if}

		{#if recipeData.metadata.description}
			<p class="mt-2 text-lg opacity-50">{recipeData.metadata.description}</p>
		{/if}

		{#if recipeData.metadata.servings}
			<p class="text-md mt-4 opacity-50">
				Serves {recipeData.metadata.servings}
				{recipeData.metadata.servings === 1 ? 'person' : 'people'}
			</p>
		{/if}
	</div>

	<div class="divider" />

	<div class="mb-3 flex items-center justify-center sm:block sm:w-full">
		<SelectBar
			tabs={[
				{ id: 'steps', name: 'Steps' },
				{ id: 'cookware', name: 'Cookware' },
				{ id: 'ingredients', name: 'Ingredients' }
			]}
			on:tabChange={(e) => (currentTab = e.detail.tab.id)}
		/>
	</div>

	{#if currentTab === 'steps'}
		<Steps recipe={recipeData} />
	{:else if currentTab === 'cookware'}
		<Cookware recipe={recipeData} />
	{:else if currentTab === 'ingredients'}
		<Ingredients recipe={recipeData} />
	{/if}
{:catch error}
	<p>{error.message}</p>
{/await}
