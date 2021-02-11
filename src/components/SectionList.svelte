<script lang="ts">
  import type { ContentItem } from "src/interfaces/content-item";
  import EditBar from "./EditBar.svelte";
  import SectionListItem from "./SectionListItem.svelte";
  export let theme: number = 0; // Theme 1 = standard
  export let items: ContentItem[] = [];
</script>

{#if items}
  <div>
    <div class="s-list-editbar">
      <div>
        <EditBar add={true} showtext={true} config={{addText: "Add new block"}} />
      </div>
    </div>
    <div class="s-info-list">
      {#each items as item}
        <SectionListItem {theme} {item} />
      {/each}
    </div>
  </div>
{/if}

<style>
  .s-info-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  .s-list-editbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
</style>
