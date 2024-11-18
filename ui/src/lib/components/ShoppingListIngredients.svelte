<script lang="ts">
	import { formatGroupedQuantity } from "$lib/quantity";

	let { recipe = { ingredients: [] } } = $props();
</script>

{#each recipe.ingredients as ingredient}
	<div class="flex justify-between">
		<span>{ingredient.name}</span>
		<span class="opacity-50">{formatGroupedQuantity(ingredient.quantity)}</span>
	</div>
{/each}
