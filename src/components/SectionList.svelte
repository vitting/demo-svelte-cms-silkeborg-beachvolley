<script lang="ts">
  import type { ContentItem } from "src/interfaces/content-item";

  import SectionListItem from "./SectionListItem.svelte";
  export let theme: number = 1; // Theme 1 = standard
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
</style>
