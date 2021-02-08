<script lang="ts">
  import SectionIntro from "./SectionIntro.svelte";
  import SectionParagraph from "./SectionParagraph.svelte";
  import SectionList from "./SectionList.svelte";
  import type { ContentSection } from "src/interfaces/content-section";
  import { onMount } from "svelte";
  import { mdiPencil, mdiCloseThick, mdiPlusThick  } from "@mdi/js";
  import Icon from "./Icon.svelte";
  export let theme: number = 0; // Theme 0 = standard
  export let data: ContentSection;
  export let index: number = 0;

  onMount(() => {});

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
      <div class="edit-section" title="edit page">
        <button type="button" class="edit-button" title="edit page">
          <Icon path={mdiPencil} class="edit-icon" />
          <span class="edit-button-text">Edit page</span>
        </button>
        <button type="button" class="edit-button" title="add element">
          <Icon path={mdiPlusThick } class="edit-icon" />
          <span class="edit-button-text">Add element</span>
        </button>
        <button type="button" class="edit-button" title="close edit">
          <Icon path={mdiCloseThick} class="edit-icon" />
          <span class="edit-button-text">Exit edit</span>
        </button>
      </div>
    </div>
    <h1 class="s-title">{data.title}</h1>

    <SectionIntro text={data.text} image={data.image} {theme} />

    {#each data.paragraphs as pragraph (pragraph.id)}
      <SectionParagraph data={pragraph} />
    {/each}

    <SectionList {theme} items={data.items} />
  </section>
{/if}

<style>
  :global(.edit-section-container button .edit-icon) {
    width: 30px;
    margin: 0 10px;
    cursor: pointer;
  }

  .edit-button {
    background-color: hsl(210, 9%, 13%);
    border:none;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
    transition: transform 0.5s;
  }

  .edit-button:hover {
    transform: scale(1.2);
  }

  .edit-button-text {
    font-family: var(--top-font-family);
    font-size: 0.6rem;
    margin-top: 3px;
    color: white;
  }
  .edit-section-container {
    display: flex;
    justify-content: flex-end;
    
  }

  .edit-section {
    background-color: rgb(30, 33, 36);
    color: white;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
    padding: 10px;
  }
  .section {
    /* margin: 10px 0; */
    padding: 0.5rem 2rem;
    position: relative;
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
  }
</style>
