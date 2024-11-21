<script lang="ts">
	import type { Cookware, Ingredient, Step, Timer } from '$lib/cookType';
	import { formatGroupedQuantity, formatQuantity, type Quantity } from '$lib/quantity';
	import { onMount } from 'svelte';
	import Test from '../Test.svelte';
	import TimerModal from '../customModals/TimerModal.svelte';

	let {
		recipe
	}: {
		recipe: {
			sections: { steps: Step[] }[];
			ingredients: Ingredient[];
			cookware: Cookware[];
			timers: Timer[];
		};
	} = $props();

	let timerModal: TimerModal;

	let currentTimer: Timer | null = $state(null);

	function formatText(item: Step['items'][0]) {
		return item.value;
	}

	function formatIngredient(ingredient: Ingredient) {
		return ingredient.name;
	}

	function formatCookware(cookware: Cookware) {
		return cookware.name;
	}

	function formatTimer(timer: Timer | Ingredient) {
		if (!('quantity' in timer)) {
			return (timer as Timer).name;
		} else {
			return formatQuantity((timer as Ingredient).quantity as Quantity);
		}
	}



	function popupTimer(data: Timer) {
		currentTimer = data;
		timerModal.open()
		console.log(data);
	}

	function parseStep(
		items: Step['items'],
		ingredients: Ingredient[],
		cookware: Cookware[],
		timers: Timer[]
	) {
		// document.dispatchEvent(new CustomEvent('timer', { detail: { hello: "world" } }))

		return items
			.map((item: any) => {
				switch (item.type) {
					case 'ingredient':
						return `${formatIngredient(ingredients[item.index])} <span class="opacity-50">(${formatQuantity(ingredients[item.index].quantity)})</span>`;
					// return formatIngredient(ingredients[item.index]);
					case 'cookware':
						return formatCookware(cookware[item.index]);
					case 'text':
						return formatText(item);
					case 'timer':
						// console.log(item.index);

						// popupTimer(timers[item.index])
						return `<button class="btn btn-link !p-0 timer" onclick="document.dispatchEvent(new CustomEvent('timer', { detail: { timer: ${item.index} } }))">${formatTimer(timers[item.index])}</button>`;
					default:
						throw new Error(`Unrecognizable item type ${item.type}`);
				}
			})
			.join('');
	}

	onMount(() => {
		document.addEventListener(
			'timer',
			function (e) {
				const timerId = (e as CustomEvent).detail.timer
				popupTimer(recipe.timers[timerId])
			},
			false
		);
	});
</script>

<ul>
	{#each recipe.sections[0].steps as step, index}
		<li>
			<div class="flex flex-col space-y-2 py-4">
				<h2 class="text-xl font-semibold">
					Step {index + 1}:
				</h2>
				<span>
					{@html parseStep(step.items, recipe.ingredients, recipe.cookware, recipe.timers)}
				</span>
			</div>
		</li>
	{/each}
</ul>

<TimerModal bind:this={timerModal} timer={currentTimer}></TimerModal>
