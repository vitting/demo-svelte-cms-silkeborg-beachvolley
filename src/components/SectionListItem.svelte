<script lang="ts">
  import type { ContentItem } from "src/interfaces/content-item";

  export let theme: number = 1; // Theme 1 = standard
  export let item: ContentItem;
</script>

{#if item}
  <div
    class="s-info-item"
    class:theme-1={theme === 0}
    class:theme-2={theme === 1}
  >
    <h2 class="s-info-title">
      {item.title}
    </h2>
    <div class="s-info-text">
      {item.resume}
    </div>
    {#if item?.text}
      <div class="s-info-action">
        <button type="button" class="s-info-button">Læs mere</button>
      </div>
    {/if}
  </div>
{/if}

<style>
  .s-info-item {
    background-color: var(--bgcolor-theme1-color2);
    padding: 1rem;
    margin: 1rem 0;
    border-radius: var(--border-radius);
  }

  .s-info-item:last-child {
    margin-bottom: 0;
  }

  .s-info-title {
    font-size: var(--text-size-h2);
    font-weight: 500;
  }

  .s-info-text {
    padding: 1rem 0;
  }

  .s-info-action {
    display: flex;
    justify-content: flex-end;
  }

  .s-info-button {
    border: none;
    background-color: var(--bgcolor-theme1-color3);
    color: #fff;
    padding: 0.6rem;
    border-radius: var(--border-radius);
  }

  .theme-2 {
    background-color: var(--bgcolor-theme2-color2);
  }

  .theme-2 .s-info-button {
    background-color: var(--bgcolor-theme2-color3);
  }
</style>
