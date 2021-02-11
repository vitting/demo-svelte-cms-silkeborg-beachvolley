<script lang="ts">
  import SectionIntro from "./SectionIntro.svelte";
  import SectionParagraph from "./SectionParagraph.svelte";
  import SectionList from "./SectionList.svelte";
  import type { ContentSection } from "src/interfaces/content-section";
  import { onMount } from "svelte";
  import EditBar from "./EditBar.svelte";
import EditStore from "../stores/edit.store";
  
  export let theme: number = 0; // Theme 0 = standard
  export let data: ContentSection;
  export let index: number = 0;

  onMount(() => {
  
  });

  function handleAction(action: string) {
    EditStore.set({...$EditStore, show: true});
    console.log($EditStore);
    
  }

  $: theme = index % 2;
</script>

{#if data}
  <section
    id="home"
    class="section"
    class:theme-1={theme === 0}
    class:theme-2={theme === 1}
  >
    
    <div class="edit-section-container">
      <EditBar edit={true} add={true} showtext={true} config={{editText: "Edit section", addText: "Add section"}} />
    </div>
    <div class="s-container-title">
      <div class="s-editbar"><EditBar edit={true} on:action={(e) => handleAction(e.detail)} /></div>
      <h1 class="s-title">{data.title}</h1>
    </div>

    <SectionIntro sectionid={data.id} text={data.text} image={data.image} {theme} />

    <div class="paragraph-list">
      <div class="paragraph-list-editbar">
        <EditBar add={true} showtext={true} config={{addText: "Add new paragraph"}}/>
      </div>
      {#each data.paragraphs as pragraph (pragraph.id)}
        <SectionParagraph data={pragraph} />
      {/each}
    </div>

    <SectionList {theme} items={data.items} />
  </section>
{/if}

<style>
  .paragraph-list-editbar {
    display: flex;
    justify-content: flex-end;
  }
  .s-container-title {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .s-editbar {
    position: absolute;
    align-self: center;
    top: 0;
  }
  .section {
    /* margin: 10px 0; */
    padding: 0.5rem 2rem 2rem 2rem;
    position: relative;
  }

  .edit-section-container {
    display: flex;
    justify-content: flex-end;
  }

  .theme-1 {
    background: var(--bgcolor-theme1-color1);
    color: var(--text-color-theme1);
  }

  .theme-2 {
    background: var(--bgcolor-theme2-color1);
    color: var(--text-color-theme2);
  }
  .s-title {
    position: relative;
    text-align: center;
    font-size: var(--text-size-h1);
    font-weight: var(--text-font-weight-bold);
    margin: 1.5rem 0;
  }
  @media screen and (max-width: 612px) {
    .edit-section-container {
      display: flex;
      justify-content: center;
    }
  }
</style>
