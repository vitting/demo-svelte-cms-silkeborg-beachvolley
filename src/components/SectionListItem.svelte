<script lang="ts">
  import type { ContentItem } from "src/interfaces/content-item";
  import EditBar from "./EditBar.svelte";
  export let theme: number = 0; // Theme 0 = standard
  export let item: ContentItem;
  export let editMode = false;
</script>

{#if item}
  <div class="s-info-item-outer">
    <div
      class="s-info-item"
      class:theme-1={theme === 0}
      class:theme-2={theme === 1}
    >
      <EditBar show={editMode} edit={true} remove={true} move={true} />
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
  </div>
{/if}

<style>
  .s-info-item-outer {
    flex: 1 1 50%;
    
  }
  .s-info-item {
    background: var(--bgcolor-theme1-color2);
    padding: 1rem;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    margin-bottom: 1rem;
  }

  .s-info-item:nth-child(odd) {
    margin-right: 1rem;
  }

  .s-info-title {
    font-size: var(--text-size-h2);
    font-weight: var(--text-font-weight-bold);
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
    background: var(--bgcolor-theme1-color3);
    color: #fff;
    padding: 0.6rem;
    border-radius: var(--border-radius);
  }

  .theme-1 {
    background: var(--bgcolor-theme1-color2);
  }

  .theme-2 {
    background: var(--bgcolor-theme2-color2);
  }

  .theme-1 .s-info-button {
    background-color: var(--bgcolor-theme1-color3);
  }
  .theme-2 .s-info-button {
    background-color: var(--bgcolor-theme2-color3);
  }

  @media screen and (max-width: 612px) {
    .s-info-item-outer {
      flex: 1 1 100%;
    }

    .s-info-item:nth-child(odd) {
    margin-right: 0;
  }
  }
</style>
