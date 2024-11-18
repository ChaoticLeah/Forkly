<script lang="ts">
	let { recipe = { cookware: [] } } = $props();
</script>

{#if recipe.cookware.length === 0}
	<div>None</div>
{:else}
	{#each recipe.cookware as cookware}
		<div class="flex justify-between">
			<span>{cookware.name}</span>
		</div>
	{/each}
{/if}