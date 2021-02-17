<script lang="ts">
  export let value: string;
  export let positionX = 0;
  export let positionY = 0;
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
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    width: 100%;
  }
</style>
