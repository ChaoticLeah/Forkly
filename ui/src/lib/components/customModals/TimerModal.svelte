<script lang="ts">
	import { convertTimerToSeconds, type Timer } from '$lib/cookType';
	import { success } from '$lib/toast';
    import humanizeDuration from "humanize-duration";
	import Modal from '../Modal.svelte';

	let modal: Modal;

	let { timer }: { timer: Timer | null } = $props();

	// Example timer state
	let elapsed = $state(0);
    let seconds = $state(0);
	let interval: NodeJS.Timeout | null = null;
    let alertSound = new Audio('/alarm.wav');


	export function open() {
		modal.open();
        if (timer) seconds = convertTimerToSeconds(timer);
	}

	export function close() {
		modal.close();
        alertSound.pause();
        alertSound.loop = false;
	}

	function startTimer() {
        stopTimer();
		if (timer && timer.quantity.value.value.value > 0) {
            seconds = convertTimerToSeconds(timer);
			elapsed = 0; // Reset elapsed time
			interval = setInterval(() => {
				elapsed++;
				if (elapsed >= seconds) {
					stopTimer();
					success('Timer complete!');

                    alertSound.loop = true;
                    alertSound.play();
				}
			}, 1000); // 1-second intervals
		}
	}

	function stopTimer() {
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
	}
</script>

<Modal title="Timer" bind:this={modal} hasCloseButton={false} canClose={false}>
	{#if timer != null}
		<div>
			<!-- <h2>Timer: {timer?.name || 'Unnamed'}</h2> -->
			<div class="flex w-full justify-between gap-1">
				<p>Elapsed: {humanizeDuration(elapsed * 1000)}</p>
				<p>{humanizeDuration(seconds * 1000)}</p>
			</div>
			<progress
				class="progress progress-accent w-full"
				value={elapsed}
				max={seconds}
			></progress>
		</div>
        <div class="flex w-full gap-1 mt-1">
            <button onclick={()=>{
                seconds -= 30;
            }} class="btn w-fit flex-1">-30 Sec</button>
			<button onclick={()=>{
                seconds -= 1 * 60;
            }} class="btn flex-1">-1 Min</button>
			<!-- <button onclick={()=>{
                seconds -= 5 * 60;
            }} class="btn flex-1">-5 Min</button> -->

            <button onclick={()=>{
                seconds += 30;
            }} class="btn flex-1">+30 Sec</button>
			<button onclick={()=>{
                seconds += 1 * 60;
            }} class="btn flex-1">+1 Min</button>
			<!-- <button onclick={()=>{
                seconds += 5 * 60;
            }} class="btn flex-1">+5 Min</button> -->
		</div>
        <div class="divider" />
		<div class="flex w-full flex-col gap-1 md:flex-row">
			<button onclick={startTimer} class="btn btn-primary flex-1">Start</button>
			<button onclick={()=>{
                stopTimer();
                close();
            }} class="btn btn-error flex-1">Close</button>
		</div>
	{/if}
</Modal>
