import type { EditMode } from "src/interfaces/edit-mode";
import { writable } from "svelte/store";

const EditEditorModalStore = writable<EditMode>({
  show: false,
  data: "",
  result: null,
});

export default EditEditorModalStore;
