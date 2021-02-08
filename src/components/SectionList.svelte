<script lang="ts">
  import type { ContentItem } from "src/interfaces/content-item";

  import SectionListItem from "./SectionListItem.svelte";
  export let theme: number = 0; // Theme 1 = standard
  export let items: ContentItem[] = [];
</script>

{#if items}
  <div class="s-info-list">
    {#each items as item}
      <SectionListItem {theme} {item} />
    {/each}
  </div>
{/if}

<style>
  .s-info-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
    
  }
</style>
