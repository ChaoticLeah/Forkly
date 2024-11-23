<script lang="ts">
	import type { Ingredient } from '$lib/cookType';
	import { formatQuantity, formatQuantityValue } from '$lib/quantity';
	import convert from 'convert';
	import Modal from '../Modal.svelte';
	import type { Unit } from 'convert';
	import { getSettingWritable, SettingsKeys } from '$lib/settingsHelper';

	let modal: Modal;

	export function open() {
		modal.open();
	}

	export function close() {
		modal.close();
	}

    let truncateDecimals = getSettingWritable<boolean>(SettingsKeys.TRUNCATE_CONVERSION_DECIMALS);


	let { currentConversion }: { currentConversion: Ingredient | null } = $props();

	function getAmountType(unit: string) {
		switch (unit) {
			case 'cup':
			case 'cups':
				return 'volume';
			case 'tbsp':
			case 'tbsps':
				return 'volume';
			case 'tsp':
			case 'tsps':
				return 'volume';
			case 'ml':
			case 'mL':
				return 'volume';
			case 'l':
			case 'L':
				return 'volume';
			case 'g':
				return 'mass';
			case 'kg':
				return 'mass';
			case 'oz':
				return 'mass';
			case 'lb':
				return 'mass';
			default:
				return 'volume';
		}
	}

    function truncateNumberIfEnabled(num: number) {
        if ($truncateDecimals)
            return Math.trunc(num * 100.0) / 100.0;
        return num;
    }

	function convertTo(quantity: number, from: Unit, to: Unit) {
        return (truncateNumberIfEnabled(convert(quantity, from).to(to))).toString(); 
	}

	$effect(() => {
		if (!currentConversion) return;

		const quantityValue = Number(formatQuantityValue(currentConversion.quantity.value));
		if (!isNaN(quantityValue)) {
			try {
                const best = convert(quantityValue, currentConversion.quantity.unit as Unit)
                .to('best', isImperial ? 'imperial' : 'metric')
				bestConversion = (truncateNumberIfEnabled(best.quantity)).toString() + ' ' + best.unit;

				const amountType = getAmountType(currentConversion.quantity.unit);

				if (isImperial) {
					if (amountType === 'volume') {
						otherConversion =
							convertTo(quantityValue, currentConversion.quantity.unit as Unit, 'fl oz') +
							' fl oz\n' +
							convertTo(quantityValue, currentConversion.quantity.unit as Unit, 'tbsp') +
							' tbsp\n' +
							convertTo(quantityValue, currentConversion.quantity.unit as Unit, 'tsp') +
							' tsp\n' +
							convertTo(quantityValue, currentConversion.quantity.unit as Unit, 'cup') +
							' cup\n' +
							convertTo(quantityValue, currentConversion.quantity.unit as Unit, 'pt') +
							' pt\n' +
							convertTo(quantityValue, currentConversion.quantity.unit as Unit, 'qt') +
							' qt\n' +
							convertTo(quantityValue, currentConversion.quantity.unit as Unit, 'gal') +
							' gal\n';
					} else {
						otherConversion =
							convertTo(quantityValue, currentConversion.quantity.unit as Unit, 'oz') +
							' oz\n' +
							convertTo(quantityValue, currentConversion.quantity.unit as Unit, 'lb') +
							' lb\n' +
							convertTo(quantityValue, currentConversion.quantity.unit as Unit, 'g') +
							' g\n' +
							convertTo(quantityValue, currentConversion.quantity.unit as Unit, 'kg') +
							' kg\n';
					}
				} else {
					if (amountType === 'volume') {
						otherConversion =
							convertTo(quantityValue, currentConversion.quantity.unit as Unit, 'ml') +
							' ml\n' +
							convertTo(quantityValue, currentConversion.quantity.unit as Unit, 'l') +
							' l\n';
					} else {
						otherConversion =
							convertTo(quantityValue, currentConversion.quantity.unit as Unit, 'g') +
							' g\n' +
							convertTo(quantityValue, currentConversion.quantity.unit as Unit, 'kg') +
							' kg\n';
					}
				}
			} catch (error) {
				bestConversion = 'Cannot convert';
				otherConversion = '';
			}
			// console.log(convert(quantityValue, currentConversion.quantity.unit as Unit).to('cup'));
		} else {
			console.error('Invalid quantity value');
			bestConversion = 'Cannot convert';
			otherConversion = '';
		}
	});

	let isImperial = $state(false);

	let bestConversion: string = $state('');

	let otherConversion: string = $state('');
</script>

<Modal title="Convert" bind:this={modal} hasCloseButton={true} canClose={true}>
	{#if currentConversion}
		<label class="label cursor-pointer">
			<span class="label-text">Imperial Units</span>
			<input type="checkbox" class="toggle" bind:checked={isImperial} />
		</label>

		<!-- <div class="divider" /> -->
		<h2 class="text-lg">{formatQuantity(currentConversion.quantity)} is</h2>
		<h3 class="text-lg font-bold">{bestConversion}</h3>

		<p class="whitespace-pre-line">{otherConversion}</p>
	{/if}
</Modal>
