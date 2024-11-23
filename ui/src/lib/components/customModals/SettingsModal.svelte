<script lang="ts">
	import { getSettingWritable, SettingsKeys } from '$lib/settingsHelper';
	import { disableScreenSleep } from '$lib/wakelock';
	import Modal from '../Modal.svelte';

	let modal: Modal;

	export function open() {
		modal.open();
	}

	export function close() {
		modal.close();
	}

	let keepAwake = getSettingWritable<boolean>(SettingsKeys.KEEP_AWAKE);

	let truncateDecimals = getSettingWritable<boolean>(SettingsKeys.TRUNCATE_CONVERSION_DECIMALS);
	// let $keepAwake = false;
</script>

<Modal title="Settings" bind:this={modal}>
		<label class="label cursor-pointer">
			<span class="label-text">Keep the screen on</span>
			<input type="checkbox" class="toggle" bind:checked={$keepAwake} on:change={()=>{
                disableScreenSleep($keepAwake);
            }} />
		</label>
		<label class="label cursor-pointer">
			<span class="label-text">Truncate conversion decimals</span>
			<input type="checkbox" class="toggle" bind:checked={$truncateDecimals} on:change={()=>{
				location.reload();
            }}/>
		</label>
</Modal>
