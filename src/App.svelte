<script lang="typescript">
  import TopBar from "./components/TopBar.svelte";
  import SectionItem from "./components/SectionItem.svelte";
  import { onMount } from "svelte";
  import ContentStore from "./stores/content-store";
import DatabaseService from "./services/database.service";

  onMount(async () => {
    const data = await DatabaseService.getSiteData();    
    if (data) {
      ContentStore.set([data]);
    }
  });
</script>

<div class="App">
  <div class="bgimage"></div>
  <div class="page">
    <TopBar />
    <main>
      {#if $ContentStore.length}
        {#each $ContentStore[0].sections as section, i (section.id)}
          <SectionItem data={section} index={i} />
        {/each}
      {/if}
    </main>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&display=swap");
  :root {
    /* --text-color-theme1: #8f0909; */
    --text-font-weight-normal: 300;
    --text-font-weight-bold: 500;
    --text-color-theme1: #612c2c;
    --text-color-theme2: #fff;
    /* --bgcolor-theme1-color1: #fff; */
    --bgcolor-theme1-color1: linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(224, 224, 224) 100%);
    --bgcolor-theme2-color1: linear-gradient(90deg, rgba(234,98,36,1) 0%, rgba(255,162,0,1) 100%);
    /* --bgcolor-theme2-color1: #ea6224; */
    --bgcolor-theme1-color2: rgb(237, 237, 237);
    --bgcolor-theme2-color2: #db5417;
    --bgcolor-theme1-color3: #ababab;
    --bgcolor-theme2-color3: #a84618;
    --text-size-h1: 2rem;
    --text-size-h2: 1.2rem;
    --main-font-family: "Poppins", sans-serif;
    --top-font-family: "Lato", sans-serif;
    --border-radius: 8px;
  }
  :global(*, *::before, *::after) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :global(html) {
    scroll-behavior: smooth;
  }
  :global(body) {
    font-family: var(--main-font-family);
    color: var(--text-color-theme1);
  }

  .App {
    display: flex;
    justify-content: center;
    font-weight: var(--text-font-weight-normal);
  }

  .bgimage {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: url("images/bgimage.jpg") no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(8px);
    z-index: -1;
  }

  .page {
    max-width: 1000px;
    padding: 0 1rem;
  }

  @media only screen and (max-width: 612px) {
    .page {
      padding: 0;
    }
    .bgimage {
      background: none;
    }
  }
</style>
