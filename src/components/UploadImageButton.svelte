<script lang="ts">
  import type { MimeTypes } from "src/interfaces/mime-types";

  import { createEventDispatcher } from "svelte";

  export let multiple: boolean = false;
  export let accept: MimeTypes[] = [];
  export let disabled = false;
  let files: FileList;
  let inputFileEl: HTMLInputElement;
  const dispatch = createEventDispatcher();
  function handleFileInput() {
    inputFileEl.click();
  }
  $: {
    if (files?.length) {
      dispatch("change", files);
    }
  }
</script>

<div class="upload-image-button">
  <button type="button" class="btn" on:click={handleFileInput} {disabled}><slot /></button>
  <input
    class="file-input"
    bind:this={inputFileEl}
    bind:files
    type="file"
    accept={accept.join(",")}
    {multiple}
  />
</div>

<style>
  .file-input {
    display: none;
  }
</style>
