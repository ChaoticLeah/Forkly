<script lang="ts">
	let navItems: { items: { href: string; text: string }[] } = $props();
</script>

<header class="rounded-badge flex w-full items-center justify-between bg-gray-800 p-4 text-white">
	<a class="flex items-center" href="/">
		<img src="favicon.png" alt="Icon" width="40" height="40" class="rounded-full" />
		<h1 class="ml-4">Cooklang Client</h1>
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
