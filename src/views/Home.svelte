<script lang="ts">
  import TopBar from "../components/TopBar.svelte";
  import SectionItem from "../components/SectionItem.svelte";
  import { getPageData } from "../stores/content-store";

  const content = getPageData();
</script>

<div>
  {#await $content}
    <div />
  {:then data}
    <div class="page">
      <TopBar />

      <main>
        {#if data.length}
          {#each data[0].sections as section, i (section.id)}
            <SectionItem data={section} index={i} />
          {/each}
        {/if}
      </main>
    </div>
  {/await}
</div>

<style>
  .page {
    max-width: var(--page-max-width);
  }

  @media only screen and (max-width: 612px) {
  }
</style>
