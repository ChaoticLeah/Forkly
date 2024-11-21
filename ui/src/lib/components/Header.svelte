<script lang="ts">
	let navItems: { items: { href: string; text: string }[] } = $props();
</script>

<header class="rounded-badge flex w-full items-center justify-between bg-gray-800 p-4 text-white">
	<a class="flex items-center" href="/">
		<img src="favicon.png" alt="Icon" width="40" height="40" class="rounded-full" />
		<h1 class="ml-4">Cooklang Client</h1>
		<p class="opacity-50 text-xs pl-2">V0.0.1{process.env.NODE_ENV == 'development' ? ' - Dev Mode': ''}</p>
	</a>
	<nav>
		<ul class="m-0 flex list-none p-0">
			{#each navItems.items as item}
				<li class="ml-4">
					<a href={item.href} class="text-white no-underline hover:underline">{item.text}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
