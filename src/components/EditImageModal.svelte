<script lang="ts">
  import "cropperjs/dist/cropper.css";
  import Cropper from "cropperjs";
  import { createEventDispatcher } from "svelte";
  import UploadImageButton from "./UploadImageButton.svelte";
  import Spinner from "./Spinner.svelte";
  import Modal from "./Modal.svelte";
  import type { CroppedImageData } from "src/interfaces/cropped-image-data";
  import type { EditData } from "src/interfaces/edit-data";
  export let show = true;
  export let aspectRatioSquare = false;
  export let data: EditData;
  export let resizeCroppedImage = false;
  let cropper: Cropper;
  let loading = false;
  let imageEl: HTMLImageElement;
  let imageLoaded = false;
  let cropReady = false;
  let cropWidth = 0;
  let cropHeight = 0;
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
        cropWidth = Math.round(e.detail.width);
        cropHeight = Math.round(e.detail.height);
      },
    });

    cropper.replace(image);
  }

  function handleCancel() {
    dispatch("cancel");
  }

  function handleCropImage() {
    const { width, height } = cropper.getData(true);
    const options: Cropper.GetCroppedCanvasOptions = {
      width: aspectRatioSquare && resizeCroppedImage && width > 500 ? 500 : 0,
      height: aspectRatioSquare && resizeCroppedImage && height > 500 ? 500 : 0,
    };
    const canvas = cropper.getCroppedCanvas(options);
    console.log(canvas);

    const imageData = canvas.toDataURL();
    const croppedImageData: CroppedImageData = {
      width,
      height,
      imageData,
      elementId: data.elementId,
      sectionId: data.sectionId,
    };

    dispatch("crop", croppedImageData);
  }

  function handleFile(files: FileList) {
    const file = files.item(0);
    const fr = new FileReader();
    cropReady = false;
    imageLoaded = true;
    fr.onloadstart = (e) => {
      loading = true;
    };

    fr.onloadend = (e) => {
      loading = false;
    };

    fr.onload = () => {
      addCropper(fr.result as string);
    };

    fr.readAsDataURL(file!);
  }

  $: infoText = `W: ${cropWidth} / H: ${cropHeight}`;
</script>

<div>
  <Modal {show} title="Image">
    <div class="container">
      {#if imageLoaded}
        <div class="image-container">
          <img class="image" src="" alt="" bind:this={imageEl} />
          <div class="image-info">{infoText}</div>
        </div>
        <div class="spinner"><Spinner show={loading} /></div>
      {:else}
        <p class="no-image">No image choosen</p>
      {/if}
      <UploadImageButton
        accept={[".png", ".jpeg", ".jpg", ".webp", ".gif"]}
        on:change={(e) => handleFile(e.detail)}
        disabled={loading}>Choose file</UploadImageButton
      >
    </div>
    <div class="actions" slot="actions">
      <button class="btn" on:click={handleCropImage} disabled={!cropReady}
        >Crop</button
      >
      <button clasS="btn" on:click={handleCancel} disabled={loading}
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

  .spinner {
    display: flex;
    justify-content: center;
  }
</style>
