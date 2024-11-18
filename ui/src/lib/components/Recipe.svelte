<script lang="ts">
	import Icon from '@iconify/svelte';

	let props: {
		name: string;
		type: 'recipe' | 'folder';
		href: string;
	} = $props();
</script>

<a href={props.href} class="btn btn-neutral join-item flex items-center !p-2 !justify-start"
	><Icon icon={props.type == 'folder' ? 'fluent:folder-28-filled' : 'fluent:reciept-20-filled'} />
	{props.name}</a
>
