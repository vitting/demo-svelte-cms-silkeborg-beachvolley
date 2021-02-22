<script lang="ts">
  import Modal from "./Modal.svelte";
  import EditEditor from "./EditEditor.svelte";
  import { createEventDispatcher } from "svelte";
  import type { EditData } from "../interfaces/edit-data";
  export let show = false;
  export let data: EditData;
  export let positionX = 0;
  export let positionY = 0;
  let value = "";
  const dispatch = createEventDispatcher();

  function handleSave() {
    dispatch("save", { ...data, html: value });
  }
</script>

<div>
  <Modal {show} title="Edit" {positionX} {positionY}>
    <EditEditor html={data.html ?? ""} bind:value />
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
