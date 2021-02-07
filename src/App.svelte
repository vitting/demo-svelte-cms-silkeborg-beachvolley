<script lang="typescript">
  import TopBar from "./components/TopBar.svelte";
  import SectionItem from "./components/SectionItem.svelte";
  import { onMount } from "svelte";
  import ContentStore from "./stores/content-store";
  import { db } from "./init-firebase";

  onMount(async () => {
    const data = await fetch("http://localhost:3000/data").then((res) =>
      res.json()
    );
    if (data) {
      ContentStore.set([data]);
    }
  });
</script>

<div class="App">
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
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&display=swap");
  :root {
    /* --text-color-theme1: #8f0909; */
    --text-color-theme1: #612c2c;
    --text-color-theme2: #fff;
    --bgcolor-theme1-color1: #fff;
    --bgcolor-theme2-color1: #ea6224;
    --bgcolor-theme1-color2: #ededed;
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
  }

  .page {
    max-width: 800px;
    padding: 0 1rem;
  }
</style>
