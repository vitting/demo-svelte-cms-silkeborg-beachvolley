<script lang="ts">
  import { onMount } from "svelte";
  import EditBar from "./EditBar.svelte";
  export let sectionid: string;
  export let theme: number = 0; // Theme 0 = standard
  export let text: string = "";
  export let image: string;

  let desceditorId: string = "";
  function handleActionDesc(action: string) {
    if (text) {
    }
  }

  function handleActionImage(action: string) {}

  $: imageUrl = image;
  $: descEditId = `desc-${sectionid}`;
  $: imageEditId = `image-${sectionid}`;
</script>

<div
  class="s-image-desc-container"
  class:theme-1={theme === 0}
  class:theme-2={theme === 1}
>
  <div class="s-container">
    <EditBar
      showtext={false}
      edit={true}
      on:action={(e) => handleActionDesc(e.detail)}
    />
    <div id={descEditId} class="s-desc">
      {@html text}
    </div>
  </div>
  <div class="s-container">
    <EditBar
      showtext={false}
      edit={true}
      on:action={(e) => handleActionImage(e.detail)}
    />
    <div class="s-image">
      <div><img id={imageEditId} src="./images/{imageUrl}" alt="" /></div>
    </div>
  </div>
</div>

<style>
  .s-image-desc-container {
    margin: 0 auto;
    width: 80%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .s-image {
    margin-top: 5px;
  }

  .s-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  }

  .theme-2 .s-desc {
    order: 2;
  }

  .theme-2 .s-image {
    order: 1;
  }

  @media screen and (max-width: 612px) {
    .s-image {
      justify-self: center;
    }
    .s-image img {
      width: min(200px, 300px);
    }
    .theme-2 .s-desc {
      order: 1;
    }

    .theme-2 .s-image {
      order: 2;
    }
  }
</style>
