<script lang="typescript">
  import Router from "svelte-spa-router";
  import routes from "./routes/router";
  import EditStore from "./stores/edit.store";
  import EditSingleModal from "./components/EditSingleModal.svelte";
  import EditEditorModal from "./components/EditEditorModal.svelte";
  import type { EditData } from "./interfaces/edit-data";

  const data: EditData = {
    elementId: "",
    sectionId: "",
    title: "Velkommen",
    html:
      "<h1>KOm si kom sa</h1><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum id doloremqueut ad, magnam recusandae distinctio delectus quibusdam. Vitae id perspiciatis unde dolorem adipisci praesentium quisquam consequuntur, eveniet earum veniam? Iusto, vero assumenda ut aliquam quia, provident enim perferendis sit, odio voluptatem eaque dolorum et eum nam. Cupiditate culpa, non nisi velit ad nulla itaque, optio quae atque, debitis doloremque!</p>",
  };

  function handleSave(data: EditData) {
    console.log(data);

    clearEditstore();
  }

  function clearEditstore() {
    EditStore.set({
      show: false,
      type: "none",
      data: { elementId: "", sectionId: "" },
    });
  }
</script>

<div class="App">
  {#if $EditStore.show}
    <EditEditorModal
      {data}
      show={$EditStore.show}
      on:cancel={clearEditstore}
      on:save={(e) => handleSave(e.detail)}
    />


  {/if}

  <div class="container">
    <div class="bgimage" />
    <div class="content">
      <Router {routes} />
    </div>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&display=swap");

  :root {
    --page-max-width: 960px;
    /* --text-color-theme1: #8f0909; */
    --text-font-weight-normal: 300;
    --text-font-weight-bold: 500;
    --text-color-theme1: #36454f;
    --text-color-theme2: #fff;
    /* --bgcolor-theme1-color1: #fff; */
    --bgcolor-theme1-color1: linear-gradient(
      90deg,
      rgb(255, 255, 255) 0%,
      rgb(224, 224, 224) 100%
    );
    --bgcolor-theme2-color1: linear-gradient(
      90deg,
      rgb(112, 160, 187) 0%,
      rgb(0, 155, 216) 100%
    );
    /* --bgcolor-theme2-color1: #ea6224; */
    --bgcolor-theme1-color2: rgb(237, 237, 237);
    --bgcolor-theme2-color2: rgb(21, 138, 184);
    --bgcolor-theme1-color3: #ababab;
    --bgcolor-theme2-color3: rgb(20, 116, 155);
    --text-size-h1: 2rem;
    --text-size-h2: 1.2rem;
    --main-font-family: "Poppins", sans-serif;
    /* --main-font-family: "Roboto", sans-serif; */
    --top-font-family: "Lato", sans-serif;
    --border-radius: 8px;
    --box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    --editbar-bgcolor: rgb(27, 97, 167);
    --editbar-color: #fff;
    --button-bgcolor: rgb(27, 97, 167);
    --button-color: #fff;
    --button-outline-color: rgb(101, 155, 209);
    --modal-bgcolor: rgb(27, 97, 167);
    --modal-color: #fff;
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

  :global(button.btn) {
    background-color: var(--button-bgcolor);
    color: var(--button-color);
    padding: 0.5rem;
    border-radius: var(--border-radius);
    border: none;
    outline-color: var(--button-outline-color);
  }

  .App {
    position: relative;
  }

  .container {
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

  .content {
    padding: 0 1rem;
  }

  @media only screen and (max-width: 612px) {
    .content {
      padding: 0;
    }
    .bgimage {
      background: none;
    }
  }
</style>
