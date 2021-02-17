<script lang="ts">
  import "cropperjs/dist/cropper.css";
  import Cropper from "cropperjs";
  import { createEventDispatcher } from "svelte";
  import UploadImageButton from "./UploadImageButton.svelte";
  import Modal from "./Modal.svelte";
  import type { CroppedImageData } from "src/interfaces/cropped-image-data";
  import type { EditData } from "../interfaces/edit-data";
  import LoadingSpinnerStore from "../stores/loading-spinner.store";
  export let show = true;
  export let aspectRatioSquare = false;
  export let data: EditData;
  export let resizeCroppedImage = false;
  export let resizeWidth = 500;
  export let resizeHeight = 500;
  export let positionX = 0;
  export let positionY = 0;
  let cropper: Cropper;
  let imageEl: HTMLImageElement;
  let imageLoaded = false;
  let cropReady = false;
  let cropWidthInfo = 0;
  let cropHeightInfo = 0;
  let filename = "";
  const dispatch = createEventDispatcher();

  function destroyCropperIfExists() {
    if (cropper) {
      cropper.destroy();
    }
  }

  function addCropper(image: string) {
    destroyCropperIfExists();

    cropper = new Cropper(imageEl, {
      viewMode: 3,
      aspectRatio: aspectRatioSquare ? 1 / 1 : 0,
      movable: false,
      zoomable: false,
      modal: true,
      background: false,
      highlight: false,
      responsive: false,
      ready: () => {
        cropReady = true;
      },
      crop: (e) => {
        cropWidthInfo = Math.round(e.detail.width);
        cropHeightInfo = Math.round(e.detail.height);
      },
    });

    cropper.replace(image);
  }

  function handleCancel() {
    dispatch("cancel");
  }

  function handleCropImage() {
    let { width, height } = cropper.getData(true);
    const options: Cropper.GetCroppedCanvasOptions = {
      width: 0,
      height: 0,
    };
    if (resizeCroppedImage && width > resizeWidth) {
      options.width = resizeWidth;
      width = resizeWidth;
    }

    if (resizeCroppedImage && height > resizeHeight) {
      options.height = resizeHeight;
      height = resizeHeight;
    }

    const canvas = cropper.getCroppedCanvas(options);

    const imageDataJpg = canvas.toDataURL("image/jpeg", 0.75);
    const imageDataWebp = canvas.toDataURL("image/webp", 0.75);
    console.log(imageDataJpg.length, imageDataWebp.length);

    const croppedImageData: CroppedImageData = {
      width,
      height,
      filename,
      dataJpeg: imageDataJpg,
      dataWebp: imageDataWebp,
      elementId: data.elementId,
      sectionId: data.sectionId,
    };

    dispatch("crop", croppedImageData);
  }

  async function handleFile(files: FileList) {
    const file = files.item(0);
    if (file) {
      LoadingSpinnerStore.set(true);
      filename = file.name;
      cropReady = false;
      imageLoaded = true;
      try {
        const dataUrl = await loadFile(file);
        addCropper(dataUrl);
      } catch (error) {
        console.error(error);
      } finally {
        LoadingSpinnerStore.set(false);
      }
    }
  }

  function loadFile(file: File) {
    return new Promise<string>((resolve, reject) => {
      const fr = new FileReader();

      fr.onerror = (error) => {
        reject(error);
      };

      fr.onload = () => {
        resolve(fr.result as string);
      };

      fr.readAsDataURL(file!);
    });
  }

  $: infoText = `W: ${cropWidthInfo} / H: ${cropHeightInfo}`;
</script>

<div>
  <Modal {show} title="Image">
    <div class="container">
      {#if imageLoaded}
        <div class="image-container">
          <img class="image" src="" alt="" bind:this={imageEl} />
          <div class="image-info">{infoText}</div>
        </div>
      {:else}
        <p class="no-image">No image choosen</p>
      {/if}
      <UploadImageButton
        accept={[".png", ".jpeg", ".jpg", ".webp", ".gif"]}
        on:change={(e) => handleFile(e.detail)}
        disabled={$LoadingSpinnerStore}>Choose file</UploadImageButton
      >
    </div>
    <div class="actions" slot="actions">
      <button class="btn" on:click={handleCropImage} disabled={!cropReady}
        >Crop</button
      >
      <button clasS="btn" on:click={handleCancel} disabled={$LoadingSpinnerStore}
        >Cancel</button
      >
    </div>
  </Modal>
</div>

<style>
  .container {
    min-width: 200px;
  }
  .image-container {
    position: relative;
    margin-bottom: 1rem;
  }

  .image-info {
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: white;
    font-size: 0.6rem;
  }

  img {
    width: 100%;
  }

  .no-image {
    padding: 1rem 0;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }

  .btn:first-child {
    margin-right: 1rem;
  }
</style>
