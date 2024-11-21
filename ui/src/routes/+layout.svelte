<script lang="ts">
	import { pageTitle, title } from '$lib/title.svelte';
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
	let { children } = $props();
	
	// let title = `Recipe Manager`;
</script>

<svelte:head>
    <title>{title} - {pageTitle.name}</title>
</svelte:head>

{@render children()}

<Toaster />