<script lang="ts">
  import Modal from "./Modal.svelte";
  import EditSingle from "./EditSingle.svelte";
  import { onDestroy, onMount } from "svelte";
  import EditSingleModalStore from "../stores/edit-single-modal.store";
  import type { EditResultCallback } from "../interfaces/edit-result-callback";

  let value: string = "";
  let show = false;
  let positionY = 0;
  let resultCallback: EditResultCallback | null;

  let unsubStore: () => void;
  function handleSave() {
    show = false;
    if (resultCallback) {
      resultCallback(value);
    }
  }

  function handleCancel() {
    show = false;
    if (resultCallback) {
      resultCallback(null);
    }
  }

  onMount(() => {
    unsubStore = EditSingleModalStore.subscribe((data) => {
      value = data.data;
      positionY = data.positionY;
      show = data.show;
      resultCallback = data.result;
    });
  });

  onDestroy(() => {
    unsubStore();
  });
</script>

<div class="edit-single-modal">
  {#if show}
    <Modal {show} title="Edit" {positionY}>
      <EditSingle bind:value />
      <div class="actions" slot="actions">
        <button class="btn" on:click={handleSave}>Save</button>
        <button clasS="btn" on:click={handleCancel}>Cancel</button>
      </div>
    </Modal>
  {/if}
</div>

<style>
  .actions {
    display: flex;
    justify-content: flex-end;
  }

  .btn:first-child {
    margin-right: 1rem;
  }
</style>
