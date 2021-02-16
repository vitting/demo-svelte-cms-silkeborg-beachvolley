<script lang="typescript">
  import Router from "svelte-spa-router";
  import routes from "./routes/router";
  import EditStore from "./stores/edit.store";
  import EditSingleModal from "./components/EditSingleModal.svelte";
  import EditEditorModal from "./components/EditEditorModal.svelte";
  import EditImageModal from "./components/EditImageModal.svelte";
  import type { EditData } from "./interfaces/edit-data";
  import type { CroppedImageData } from "./interfaces/cropped-image-data";
  import StorageService from "./services/storeage.service";
  import SpinnerLoader from "./components/SpinnerLoader.svelte";
import LoadingSpinnerStore from "./stores/loading-spinner.store";

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

  async function handleCrop(data: CroppedImageData) {
    const url1 = await StorageService.addImage(
      data.dataJpeg,
      data.filename,
      data.width,
      data.height,
      "jpeg"
    );
    const url2 = await StorageService.addImage(
      data.dataWebp,
      data.filename,
      data.width,
      data.height,
      "webp"
    );

    console.log(url1);
    console.log(url2);
    

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
  {#if $LoadingSpinnerStore}
    <SpinnerLoader></SpinnerLoader>
  {/if}
  {#if $EditStore.show}
    <EditEditorModal
      {data}
      show={$EditStore.show}
      on:cancel={clearEditstore}
      on:save={(e) => handleSave(e.detail)}
    />
    <!-- <EditSingleModal
      {data}
      show={$EditStore.show}
      on:cancel={clearEditstore}
      on:save={(e) => handleSave(e.detail)}
    /> -->
    <!-- <EditImageModal
      {data}
      show={$EditStore.show}
      aspectRatioSquare={true}
      resizeCroppedImage={true}
      on:cancel={clearEditstore}
      on:crop={(e) => handleCrop(e.detail)}
    /> -->
  {/if}

  <div class="container">
    <div class="bgimage" />
    <div class="content">
      <Router {routes} />
    </div>
  </div>
</div>

<style>
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
