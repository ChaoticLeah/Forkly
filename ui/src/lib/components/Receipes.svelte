<script lang="ts">
	import { page } from '$app/stores';
	import { fetchRecipes } from '$lib/backend';
	import { pageTitle } from '$lib/title.svelte';
	import { onMount } from 'svelte';
	import Recipe from './Recipe.svelte';
	import RecipePage from './recipePage/RecipePage.svelte';

	let dir = $derived($page.url.searchParams.get('dir')?.replace('Home', '') ?? '');
	let currentRecipes: string[] = [];

	$effect(setTitle);

	function setTitle() {
		// Check if the dir is a recipe or a folder
		if (dir) {
			const isRecipe = currentRecipes.includes(dir);
			if (isRecipe) {
				pageTitle.name = 'Recipe';
			} else {
				pageTitle.name = 'Home';
			}
		}
	}

	function removeDupes<T>(array: T[]): T[] {
		return [...new Set(array)];
	}

	interface Item {
		name: string;
		type: 'recipe' | 'folder';
	}

	function getCurrentDirItems(recipes: string[]): Item[] {
		//if dir is empty, return the top most level
		// [
		// 	'seed/Baked Potato Soup',
		// 	'seed/Borsch',
		// 	'seed/Neapolitan Pizza',
		// 	'seed/Olivier Salad',
		// 	'seed/Potstickers',
		// 	'seed/Root Vegetable Tray Bake',
		// 	'seed/Sicilian-style Scottadito Lamb Chops',
		// 	'seed/Snack Basket I',
		// 	'seed/Snack Basket II',
		// 	'seed/Breakfasts/Easy Pancakes',
		// 	'seed/Breakfasts/Mexican Style Burrito',
		// 	'seed/Salads/Beetroot, feta & grain salad',
		// 	'seed/Salads/Caprese Salad'
		// ];
		// as an example of the recipes array. If dir is empty, return ['seed']. If dir is seed, return all the recipes that start with seed but are not in a subfolder of seed
		// If its seed/Breakfasts, return all the recipes that start with seed/Breakfasts but are not in a subfolder of seed/Breakfasts

		if (!dir) {
			// Return top-level directories as folders if no directory is specified
			const topLevelFolders = [...new Set(recipes.map((recipe) => recipe.split('/')[0]))];
			return topLevelFolders.map((name) => ({ name, type: 'folder' }));
		}

		const dirParts = dir.split('/');

		const items: Item[] = recipes
			.filter((recipe) => {
				const recipeParts = recipe.split('/');
				return (
					recipeParts.slice(0, dirParts.length).join('/') === dir &&
					recipeParts.length === dirParts.length + 1 // Ensures it's not a subdirectory
				);
			})
			.map((recipe) => ({
				name: recipe.split('/').pop() as string,
				type: 'recipe' as 'recipe'
			}));

		const subfolders = [
			...new Set(
				recipes
					.filter((recipe) => {
						const recipeParts = recipe.split('/');
						return (
							recipeParts.slice(0, dirParts.length).join('/') === dir &&
							recipeParts.length > dirParts.length + 1 // Ensures it's a subdirectory
						);
					})
					.map((recipe) => recipe.split('/')[dirParts.length])
			)
		].map((name) => ({ name, type: 'folder' as 'folder' }));

		return [...subfolders, ...items];
	}

	function cacheRecipes(recipes: string[]) {
		currentRecipes = recipes;
		//setTitle();
	}

	function isRecipe(dir: string, recipes: string[]) {
		for (let i = 0; i < recipes.length; i++) {
			if (recipes[i] == dir) {
				return true;
			}
		}
		return false;
	}
</script>

<div class="join join-vertical">
	{#await fetchRecipes()}
		<!-- <p>Loading...</p> -->
		<span class="loading loading-spinner loading-lg"></span>
	{:then recipes}
		{cacheRecipes(recipes)}
		{#key $page.url.searchParams.get('dir')}
			{#if isRecipe($page.url.searchParams.get('dir') ?? '', recipes)}
				<RecipePage recipe={$page.url.searchParams.get('dir') ?? ''} />
			{:else}
				{#each getCurrentDirItems(recipes) as recipe}
					{#if recipe.type === 'folder'}
						<Recipe
							name={recipe.name}
							type={recipe.type}
							href={`?dir=${dir}${dir.length > 0 ? '/' : ''}${recipe.name}`}
						></Recipe>
					{:else}
						<Recipe
							name={recipe.name}
							type={recipe.type}
							href={`?dir=${dir}${dir.length > 0 ? '/' : ''}${recipe.name}`}
						></Recipe>
					{/if}
				{/each}
			{/if}
		{/key}
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>
