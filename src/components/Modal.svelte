<script lang="ts">
  import { fade } from "svelte/transition";

  import Backdrop from "./Backdrop.svelte";
  export let show = false;
  export let title = "";

  function handleClose() {
    show = false;
  }
</script>

{#if show}
  <Backdrop />
  <div class="modal-container" transition:fade={{ duration: 200 }}>
    <header class="header">{title}</header>
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
    z-index: 999;
    max-width: 500px;
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
  }

  .actions {
    margin-top: 1rem;
  }

  .modal-close {
    display: flex;
    justify-content: flex-end;
  }
</style>
