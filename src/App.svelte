<script lang="typescript">
  import EditStore from "./stores/edit.store";
  import EditSingleModal from "./components/EditSingleModal.svelte";
  import EditEditorModal from "./components/EditEditorModal.svelte";
  import EditImageModal from "./components/EditImageModal.svelte";
  import type { EditData } from "./interfaces/edit-data";
  import type { CroppedImageData } from "./interfaces/cropped-image-data";
  import StorageService from "./services/storeage.service";
  import SpinnerLoader from "./components/SpinnerLoader.svelte";
  import LoadingSpinnerStore from "./stores/loading-spinner.store";
  import ImageService from "./services/image.service";
  import { Route, router } from "tinro";
  import Home from "./views/Home.svelte";
  import Login from "./views/Login.svelte";
  import { onMount } from "svelte";
  import AuthService from "./services/auth.service";
import { EditService } from "./services/edit.service";

  async function handleSaveHtml(data: EditData) {
    LoadingSpinnerStore.set(true);
    const html = EditService.prepareHtmlToSave(data);
    LoadingSpinnerStore.set(false);

    console.log(html);

    clearEditstore();
  }

  function handleSaveText(data: EditData) {
    console.log(data);
  }
  async function handleCrop(data: CroppedImageData) {
    const uploadData = await ImageService.uploadImages(
      data.dataWebp,
      data.dataJpeg,
      data.width,
      data.height,
      data.filename
    );
    clearEditstore();
  }

  function clearEditstore() {
    EditService.clearEditStore();
  }

  onMount(async () => {
    const user = await AuthService.getUserInit();
    if (!user) {
      router.goto("/login");
    }
  });
</script>

<div class="App">
  {#if $LoadingSpinnerStore}
    <SpinnerLoader />
  {/if}
  {#if $EditStore.show && $EditStore.type === "multi"}
    <EditEditorModal
      data={$EditStore.data}
      show={$EditStore.show}
      positionY={$EditStore.clickY}
      on:cancel={clearEditstore}
      on:save={(e) => handleSaveHtml(e.detail)}
    />
  {/if}
  {#if $EditStore.show && $EditStore.type === "single"}
    <EditSingleModal
      data={$EditStore.data}
      positionY={$EditStore.clickY}
      show={$EditStore.show}
      result={$EditStore.result}
      on:cancel={clearEditstore}
      on:save={(e) => handleSaveText(e.detail)}
    />
  {/if}
  {#if $EditStore.show && $EditStore.type === "image"}
    <EditImageModal
      data={$EditStore.data}
      positionY={$EditStore.clickY}
      show={$EditStore.show}
      aspectRatioSquare={true}
      on:cancel={clearEditstore}
      on:crop={(e) => handleCrop(e.detail)}
    />
  {/if}
  <div class="container">
    <div class="bgimage" />
    <div class="content">
      <Route path="/"><Home /></Route>
      <Route path="/login"><Login /></Route>
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
    position: relative;
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
