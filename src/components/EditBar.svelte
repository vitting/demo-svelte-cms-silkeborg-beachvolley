<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    mdiPencil,
    mdiCloseThick,
    mdiPlusThick,
    mdiContentSaveEdit,
    mdiArrowUpDown,
    mdiDelete,
  } from "@mdi/js";
  import Icon from "./Icon.svelte";
import type { EditBarConfig } from "src/interfaces/editbar-config";

  export let edit = false;
  export let exit = false;
  export let save = false;
  export let add = false;
  export let remove = false;
  export let move = false;
  export let config: EditBarConfig = {
    addText: "Add",
    editText: "Edit",
    moveText: "Move",
    exitText: "Exit",
    removeText: "Delete",
    saveText: "Save"
  };

  export let showtext = false;
  const dispatch = createEventDispatcher();

  function handleClick(action: string) {
    dispatch("action", action);
  }
</script>

<div class="edit-section-main">
  <div class="edit-section" class:showtext={showtext === false}  title="edit page">
    {#if edit}
      <button
        type="button"
        class="edit-button"
        title={config.editText}
        on:click={() => handleClick("edit")}
      >
        <Icon path={mdiPencil} class="edit-icon" />
        <span class="edit-button-text">{config.editText}</span>
      </button>
    {/if}
    {#if exit}
      <button
        type="button"
        class="edit-button"
        title={config.exitText}
        on:click={() => handleClick("exit")}
      >
        <Icon path={mdiCloseThick} class="edit-icon" />
        <span class="edit-button-text">{config.exitText}</span>
      </button>
    {/if}
    {#if save}
      <button
        type="button"
        class="edit-button"
        title={config.saveText}
        on:click={() => handleClick("save")}
      >
        <Icon path={mdiContentSaveEdit} class="edit-icon" />
        <span class="edit-button-text">{config.saveText}</span>
      </button>
    {/if}
  
    {#if add}
      <button
        type="button"
        class="edit-button"
        title={config.addText}
        on:click={() => handleClick("add")}
      >
        <Icon path={mdiPlusThick} class="edit-icon" />
        <span class="edit-button-text">{config.addText}</span>
      </button>
    {/if}
    {#if remove}
      <button
        type="button"
        class="edit-button"
        title={config.removeText}
        on:click={() => handleClick("delete")}
      >
        <Icon path={mdiDelete} class="edit-icon" />
        <span class="edit-button-text">{config.removeText}</span>
      </button>
    {/if}
    {#if move}
      <button
        type="button"
        class="edit-button"
        title={config.moveText}
        on:click={() => handleClick("move")}
      >
        <Icon path={mdiArrowUpDown} class="edit-icon" />
        <span class="edit-button-text">{config.moveText}</span>
      </button>
    {/if}
  </div>
</div>

<style>
  :global(.edit-section button .edit-icon) {
    width: 15px;
    margin: 0 10px;
    cursor: pointer;
  }

  .edit-section-main {
    display: inline-block;
  }

  .edit-button {
    background-color: var(--editbar-bgcolor);
    border: none;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
    transition: transform 0.5s;
    outline-color: var(--button-outline-color);
  }

  .edit-button:hover {
    transform: scale(1.2);
  }

  .edit-button-text {
    font-family: var(--top-font-family);
    font-size: 0.6rem;
    margin-top: 3px;
  }

  .edit-section {
    background-color: var(--editbar-bgcolor);
    color: var(--editbar-color);
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
    padding: 10px 0;
    box-shadow: var(--box-shadow);
  }

  .edit-section.showtext {
    padding: 0.3rem;
  }

  .showtext .edit-button-text {
    display: none;
  }

  .showtext .edit-button {
    margin: 2px;
    min-width: auto;
  }
  @media screen and (max-width: 612px) {
  }
</style>
