<script>
	import { fetchShoppingList } from '$lib/backend';
	import Header from '$lib/components/Header.svelte';
	import ShoppingListIngredients from '$lib/components/ShoppingListIngredients.svelte';
	import { pageTitle } from '$lib/title.svelte';

    fetchShoppingList(['seed/Salads/Caprese Salad']).then((data) => {
        console.log(data);
    });

	console.log('Shopping list page');
	pageTitle.name = 'Shopping list';
</script>

<div class="container mx-auto px-4  max-w-screen-lg">
	<div class="flex flex-col gap-4">
		<Header
			items={[
				{ href: '/', text: 'Home' },
				{ href: '/shopping-list', text: 'Shopping list' }
			]}
		/>
        <ShoppingListIngredients recipe={{ingredients: []}} />
	</div>
</div>
