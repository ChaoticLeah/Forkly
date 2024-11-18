<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { writable } from 'svelte/store';

	interface Tab {
		id: string;
		name: string;
	}

	export let tabs: Tab[] = [
		{ id: 'test1', name: 'test 1' },
		{ id: 'test2', name: 'test 2' }
	];

	export let className: string = '';

	let activeTabIndex = writable<number>(0);
	let tabUnderlineWidth = writable<number>(0);
	let tabUnderlineLeft = writable<number>(0);
	let tabsRef: HTMLElement[] = [];

	const dispatch = createEventDispatcher();

	const setActiveTabIndex = (index: number) => {
		activeTabIndex.set(index);
		setTabPosition(index);
		dispatch('tabChange', { tab: tabs[index] });
	};

	const setTabPosition = (index: number) => {
		const currentTab = tabsRef[index];
		if (currentTab) {
			tabUnderlineLeft.set(currentTab.offsetLeft);
			tabUnderlineWidth.set(currentTab.clientWidth);
		}
	};

	// Watch for changes in tabs and reset activeTabIndex
	$: if (tabs.length > 0) {
		setTabPosition(0);
		activeTabIndex.set(0);
	}

	onMount(() => {
		setTabPosition(0);

		const unsubscribe = activeTabIndex.subscribe((index) => {
			if (index !== null) {
				setTabPosition(index);
			}
		});

		return () => {
			unsubscribe();
		};
	});
</script>

<div class="bg-base-300 relative mx-auto flex h-12 rounded-3xl px-2 backdrop-blur-sm {className}">
	<span
		class="absolute inset-y-0 -z-10 flex overflow-hidden rounded-3xl py-2 transition-all duration-300"
		style="left: {$tabUnderlineLeft}px; width: {$tabUnderlineWidth}px"
	>
		<span class="bg-accent h-full w-full rounded-3xl"></span>
	</span>

	{#each tabs as tab, index}
		<button
			bind:this={tabsRef[index]}
			class="my-auto cursor-pointer select-none rounded-full px-4 text-center text-white hover:text-neutral-300"
			on:click={() => setActiveTabIndex(index)}
		>
			{tab.name}
		</button>
	{/each}
</div>
