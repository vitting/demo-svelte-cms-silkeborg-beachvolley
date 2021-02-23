import type { EditMode } from "../interfaces/edit-mode";
import { writable } from "svelte/store";

const EditSingleModalStore = writable<EditMode>({
  show: false,
  positionY: 0,
  data: "",
  result: null,
});

export default EditSingleModalStore;
