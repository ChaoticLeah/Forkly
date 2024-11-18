<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	let { base = 'Home', subdirectory = '', className = '' } = $props();

	let splitDir = $derived(startWithHome([...($page.url.searchParams.get('dir')?.split('/') ?? [])]));


	function startWithHome(arr: string[]) {
		if (arr[0] !== base) arr.unshift(base);
		return arr;
		
	}

	function getURL(index: number) {
		return subdirectory + splitDir.slice(0, index + 1).join('/').replace(`${base}/`, '');
	}

</script>

<div class="flex {className}">
	{#each splitDir as item, i}
		<a
			class="flex items-center"
			href={getURL(i)}
			>{item}
			{#if i != splitDir.length - 1}
				<Icon icon="heroicons:chevron-right-20-solid" width="1.2rem" />
			{/if}
		</a>
	{/each}
</div>
