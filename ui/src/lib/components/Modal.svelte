<script lang="ts">
    import { onMount } from 'svelte'
  
    // export let title: string
    // export let hasCloseButton: boolean = true
    let { title, hasCloseButton } = $props()
  
    let dialogElement: HTMLDialogElement
  
    export function open() {
      dialogElement.showModal()
      if (isMobile) dialogElement.style.transform = `translateY(0px)`
    }
  
    export function close() {
      if (isMobile) dialogElement.style.transform = `translateY(200px)`
      dialogElement.close()
    }
  
    let isMobile = navigator.userAgent.match(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    )
  
    // Mobile support
    let startY: number
    let currentY: number
    let isDragging = false
  
    function handleTouchStart(event: TouchEvent) {
      startY = event.touches[0].clientY
      isDragging = true
    }
  
    function handleTouchMove(event: TouchEvent) {
      if (!isDragging) return
  
      currentY = event.touches[0].clientY
      const deltaY = currentY - startY
      if (deltaY < 0) {
        //If the user is pulling up and there is no more content to show just do a little stretch animation
        const scaleFactor = 0.99 - Math.min(-deltaY / 2000, 0.03)
        const adjustmentFactor = (1 - scaleFactor) // To ensure that there is no gap at the bottom
        const dialogHeight = dialogElement.offsetHeight
        const translateY = -(1 - scaleFactor) * dialogHeight
        dialogElement.style.transform = `translateY(${translateY}px) scale(${scaleFactor}, ${(1 / scaleFactor) + adjustmentFactor})`
      } else {
        dialogElement.style.transform = `translateY(${Math.max(0, deltaY)}px)`
      }
    }
  
    function handleTouchEnd() {
      isDragging = false
      const deltaY = currentY - startY
  
      if (deltaY > window.innerHeight / 4) {
        close()
      } else {
        dialogElement.style.transform = ''
      }
    }
  
    onMount(() => {
      if (isMobile) {
        dialogElement.style.transform = `translateY(200px)`
      }
    })
  </script>
  
  {#if !isMobile}
    <dialog bind:this={dialogElement} class="modal">
      <div class="modal-box">
        {#if hasCloseButton}
          <button
            class="btn btn-md btn-circle btn-ghost absolute right-2 top-2"
            onclick={close}>✕</button
          >
        {/if}
        <h3 class="text-lg font-bold absolute top-3">{title}</h3>
        <div class="divider pt-5"></div>
  
        <slot />
      </div>
    </dialog>
  {:else}
    <dialog
      bind:this={dialogElement}
      class="modal"
      ontouchstart={handleTouchStart}
      ontouchmove={handleTouchMove}
      ontouchend={handleTouchEnd}
    >
      <div class="modal-box absolute !bottom-0 !rounded-b-none overflow-x-hidden">
        {#if hasCloseButton}
          <button
            class="btn btn-md btn-circle btn-ghost absolute right-2 top-2"
            onclick={close}>✕</button
          >
        {/if}
        <h3 class="text-lg font-bold absolute top-4">{title}</h3>
        <div class="divider pt-5"></div>
        <slot />
      </div>
    </dialog>
  {/if}
  