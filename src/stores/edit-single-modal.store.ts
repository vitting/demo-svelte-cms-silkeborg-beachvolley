import type { EditMode } from "../interfaces/edit-mode";
import { writable } from "svelte/store";

const EditSingleModalStore = writable<EditMode>({
  show: false,
  data: "",
  result: null,
});

export default EditSingleModalStore;
