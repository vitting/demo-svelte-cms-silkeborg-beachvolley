import { writable } from "svelte/store";
import type { EditModeImage } from "../interfaces/edit-mode-image";

const EditImageModalStore = writable<EditModeImage>({
  show: false,
  aspectRatioSquare: false,
  resizeCroppedImage: false,
  resizeHeight: 500,
  resizeWidth: 500,
  positionY: 0,
  data: "",
  result: null,
});

export default EditImageModalStore;
