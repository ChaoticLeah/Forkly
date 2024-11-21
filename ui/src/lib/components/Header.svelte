<script lang="ts">
	import Icon from "@iconify/svelte";
	import SettingsModal from "./customModals/SettingsModal.svelte";

	let navItems: { items: { href: string; text: string }[] } = $props();

	let settingsModal: SettingsModal;
</script>

<header class="rounded-badge flex w-full items-center justify-between bg-gray-800 p-4 text-white">
	<a class="flex items-center" href="/">
		<img src="favicon.png" alt="Icon" width="40" height="40" class="rounded-full" />
		<h1 class="ml-4">Cooklang Client</h1>
		<p class="opacity-50 text-xs pl-2">V0.0.1{process.env.NODE_ENV == 'development' ? ' - Dev Mode': ''}</p>
	</a>
	<nav class="flex items-center">
		<ul class="m-0 flex list-none p-0">
			{#each navItems.items as item}
				<li class="ml-4 flex items-center">
					<a href={item.href} class="text-white no-underline hover:underline text-sm">{item.text}</a>
				</li>
			{/each}

			<li class="mx-1">
				<button class="btn btn-ghost btn-sm" onclick={()=>{
					settingsModal.open();
				}}><Icon icon="fluent:settings-24-regular" /></button>
			</li>
		</ul>
	</nav>
</header>

<SettingsModal bind:this={settingsModal} />