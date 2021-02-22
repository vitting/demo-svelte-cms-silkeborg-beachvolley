<script lang="ts">
  import SectionIntro from "./SectionIntro.svelte";
  import SectionParagraph from "./SectionParagraph.svelte";
  import SectionList from "./SectionList.svelte";
  import type { ContentSection } from "src/interfaces/content-section";
  import { onMount } from "svelte";
  import EditBar from "./EditBar.svelte";
  import EditStore from "../stores/edit.store";
  import type { EditbarAction } from "../interfaces/editbar-action";
import { EditService } from "../services/edit.service";

  export let theme: number = 0; // Theme 0 = standard
  export let data: ContentSection;
  export let index: number = 0;
  let editMode = false;
  let sectionId = "";
  onMount(() => {
    if (data) {
      sectionId = data.id; 
    }
  });

  async function handleEditTitle(action: EditbarAction) {
    const result2 = await EditService.editTitle(action, data.id, data.title)
    console.log("result2", result2);
    
  }

  function handleSectionEdit(action: EditbarAction) {
    if (action.action === "edit") {
      editMode = !editMode;
    }
  }

  $: theme = index % 2;
</script>

{#if data}
  <section
    id={data.id}
    class="section"
    class:theme-1={theme === 0}
    class:theme-2={theme === 1}
  >
    <div class="edit-section-container">
      <EditBar
        role={"toolbar"}
        show={true}
        edit={true}
        add={true}
        remove={true}
        showtext={true}
        config={{
          editText: "Edit section",
          addText: "Add section",
          removeText: "Delete Section",
        }}
        on:action={(e) => handleSectionEdit(e.detail)}
      />
    </div>
    <div class="s-container-title">
      <div class="s-editbar">
        <EditBar role={"title"} show={editMode} edit={true} on:action={(e) => handleEditTitle(e.detail)} />
      </div>
      <h1 class="s-title">{data.title}</h1>
    </div>

    <SectionIntro
      {editMode}
      sectionId={data.id}
      text={data.text}
      image={data.image}
      {theme}
    />

    <div class="paragraph-list">
      <div class="paragraph-list-editbar">
        <EditBar
          role={"toolbar"}
          show={editMode}
          add={true}
          showtext={true}
          config={{ addText: "Add new paragraph" }}
        />
      </div>
      {#each data.paragraphs as pragraph (pragraph.id)}
        <SectionParagraph {editMode} data={pragraph} />
      {/each}
    </div>

    <SectionList {editMode} {theme} items={data.items} />
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
