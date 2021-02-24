<script lang="ts">
  import { onMount } from "svelte";

  import { fade } from "svelte/transition";
  import Backdrop from "./Backdrop.svelte";
  export let show = false;
  export let title = "";
  let modalEl: HTMLDivElement;
  let windowInnerWidth = 0;
  let move = false;
  let moved = false;
  let scrollY = 0;
  function handleClose() {
    show = false;
  }

  function handleMouseDown(e: MouseEvent) {
    e.preventDefault();
    if (windowInnerWidth > 612) {
      modalEl.style.opacity = "0.7";
      modalEl.style.cursor = "move";
      move = true;
    }
  }

  function handleMouseUp(e: MouseEvent) {
    e.preventDefault();
    modalEl.style.opacity = "1";
    modalEl.style.cursor = "default";
    move = false;
    moved = true;
  }

  function handleMouseMove(e: MouseEvent) {
    if (move) {
      if (e.pageY > 0) {
        modalEl.style.top = e.pageY.toString() + "px";
      }

      if (e.pageX > 0) {
        modalEl.style.left = e.pageX.toString() + "px";
      }
    }
  }

  onMount(() => {
    modalEl.style.top = (scrollY + 50) + "px";
  });
</script>

<svelte:window
  on:mousemove={handleMouseMove}
  bind:innerWidth={windowInnerWidth}
  bind:scrollY={scrollY}
/>

{#if show}
  <Backdrop />
  <div
    class="modal-container"
    bind:this={modalEl}
    transition:fade={{ duration: 200 }}
  >
    <header
      class="header"
      on:mousedown={handleMouseDown}
      on:mouseup={handleMouseUp}
    >
      {title}
    </header>
    <div class="modal-inner">
      <div class="content">
        <slot />
      </div>
      <div class="actions">
        <slot name="actions"
          ><div class="modal-close">
            <button class=" btn" on:click={handleClose}>Close</button>
          </div>
        </slot>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-container {
    position: absolute;
    background-color: white;
    top: 20vh;
    left: 50%;
    transform: translateX(-50%);
    z-index: 101;

    width: 500px;
    box-shadow: var(--box-shadow);
  }

  .modal-inner {
    padding: 2rem 2rem 1rem 2rem;
  }

  .header {
    background-color: var(--modal-bgcolor);
    color: var(--modal-color);
    padding: 0 1rem;
    font-size: 1rem;
    line-height: 2rem;
    -webkit-user-select: none;
    -moz-user-select: none;
  }

  .header:hover {
    cursor: move;
  }

  .actions {
    margin-top: 1rem;
  }

  .modal-close {
    display: flex;
    justify-content: flex-end;
  }

  @media screen and (max-width: 612px) {
    .modal-container {
      width: auto;
      max-width: 500px;
      left: 0;
      transform: translateX(0);
      margin: 0 1rem;
    }
  }
</style>
