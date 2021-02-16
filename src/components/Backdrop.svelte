<script lang="ts">
import { fade } from "svelte/transition";


  // your script goes here
</script>

<div id="backdrop" transition:fade="{{duration: 200}}" />

<style>
  #backdrop {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 100;
  }
</style>
