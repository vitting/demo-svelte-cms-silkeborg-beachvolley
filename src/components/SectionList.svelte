<script lang="ts">
  import type { ContentItem } from "src/interfaces/content-item";
  import EditBar from "./EditBar.svelte";
  import SectionListItem from "./SectionListItem.svelte";
  export let theme: number = 0; // Theme 1 = standard
  export let items: ContentItem[] = [];
  export let editMode = false;
</script>

{#if items}
  <div>
    <div class="s-list-editbar">
      <div>
        <EditBar show={editMode} add={true} showtext={true} config={{addText: "Add new block"}} />
      </div>
    </div>
    <div class="s-info-list">
      {#each items as item}
        <!-- <div class="item"> -->
          <SectionListItem {editMode} {theme} {item} />
        <!-- </div> -->
      {/each}
    </div>
  </div>
{/if}

<style>
  .s-info-list {
    display: flex;
    flex-wrap: wrap;
    /* gap: 10px; */
    /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem; */
  }

  .s-list-editbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
</style>
