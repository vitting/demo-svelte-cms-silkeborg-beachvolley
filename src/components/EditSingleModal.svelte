<script lang="ts">
  import Modal from "./Modal.svelte";
  import EditSingle from "./EditSingle.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import type { EditData } from "../interfaces/edit-data";
  import type { EditResultCallback } from "../interfaces/editmode";

  export let show = false;
  export let data: EditData;
  export let result: EditResultCallback | null;
  export let positionY = 0;
  let value: string = "";
  const dispatch = createEventDispatcher();

  function handleSave() {
    if (result) {
      // result(value);
    }
    
    dispatch("save", {...data, text: value});
  }

  onMount(() => {
    if (data) {
      value = data.text!;
    }
  });
</script>

<div>
  <Modal {show} title="Edit" {positionY}>
    <EditSingle bind:value />
    <div class="actions" slot="actions">
      <button class="btn" on:click={handleSave}>Save</button>
      <button clasS="btn" on:click={() => dispatch("cancel")}>Cancel</button>
    </div>
  </Modal>
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
