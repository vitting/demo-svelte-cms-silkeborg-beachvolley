<script lang="ts">
  export let value: string;
</script>

<div class="editor">
  <input class="input" type="text" bind:value/>
</div>

<style>
  .editor {
    font-family: var(--font-family);
  }

  .input {
    font-size: var(--text-size-h1);
  }
</style>
