<script lang="ts">
  import SectionIntro from "./SectionIntro.svelte";
  import SectionParagraph from "./SectionParagraph.svelte";
  import SectionList from "./SectionList.svelte";
  import type { ContentSection } from "src/interfaces/content-section";
  import { onMount } from "svelte";

  export let theme: number = 0; // Theme 1 = standard
  export let data: ContentSection;
  export let index: number = 0;

  onMount(() => {
    
  });

  $: theme = index % 2;
</script>

{#if data}
  <section
    id="home"
    class="section"
    class:theme-1={theme === 0}
    class:theme-2={theme === 1}
  >
    <h1 class="s-title">{data.title}</h1>

    <SectionIntro text={data.text} image={data.image} />
    
    {#each data.paragraphs as pragraph (pragraph.id)}
      <SectionParagraph data={pragraph} />
    {/each}
    
    <SectionList {theme} items={data.items} />
  </section>
{/if}

<style>
  .section {
    padding: 1rem;
  }

  .theme-1 {
    background: var(--bgcolor-theme1-color1);
    color: var(--text-color-theme1);
  }

  .theme-2 {
    background: var(--bgcolor-theme2-color1);
    color: var(--text-color-theme2);
  }
  .section .s-title {
    text-align: center;
    font-size: var(--text-size-h1);
    font-weight: 500;
    margin-bottom: 1rem;
  }
</style>
