<script lang="ts">
	import '../app.css';
	let { children } = $props();
	
	let title = `Recipe Manager`;
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

{@render children()}
