<script lang="ts">
  export let show = false;
</script>

{#if show}
<div class="lds-ring">
    <div />
    <div />
    <div />
    <div />
  </div>
{/if}

<style>
  .lds-ring {
    display: inline-block;
    position: relative;
    width: var(--spinner-size);
    height: var(--spinner-size);
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: var(--spinner-size);
    height: var(--spinner-size);
    border: var(--spinner-thickness) solid var(--spinner-bgcolor);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--spinner-bgcolor) transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
