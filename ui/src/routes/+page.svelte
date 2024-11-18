<script>
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Header from '$lib/components/Header.svelte';
	import Receipes from '$lib/components/Receipes.svelte';
	import Recipe from '$lib/components/Recipe.svelte';
</script>

<div class="container mx-auto px-4  max-w-screen-lg">
	<div class="flex flex-col gap-4">
		<Header
			items={[
				{ href: '/', text: 'Home' },
				{ href: '/shopping-list', text: 'Shopping list' }
			]}
		/>
		<Breadcrumb subdirectory="?dir=" className='bg-neutral rounded-badge p-2 pl-5'></Breadcrumb>
        <Receipes />
	</div>
</div>
