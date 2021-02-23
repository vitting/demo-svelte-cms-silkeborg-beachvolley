<script lang="ts">
  import Modal from "./Modal.svelte";
  import EditEditor from "./EditEditor.svelte";
  import { onDestroy, onMount } from "svelte";
  import EditEditorModalStore from "../stores/edit-editor-modal.store";
  import type { EditResultCallback } from "../interfaces/edit-result-callback";
  let show = false;
  let value: string = "";
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
    unsubStore = EditEditorModalStore.subscribe((data) => {
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

<div class="edit-editor-modal">
  {#if show}
    <Modal {show} title="Edit" {positionY}>
      <EditEditor html={value} bind:value />
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
