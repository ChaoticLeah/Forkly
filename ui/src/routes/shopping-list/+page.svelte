<script>
	import { fetchShoppingList } from '$lib/backend';
	import Header from '$lib/components/Header.svelte';
	import ShoppingListIngredients from '$lib/components/ShoppingListIngredients.svelte';

    fetchShoppingList(['seed/Salads/Caprese Salad']).then((data) => {
        console.log(data);
    });
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
