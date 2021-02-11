import type { EditMode } from "src/interfaces/editmode";
import { writable } from "svelte/store";

const EditStore = writable<EditMode>({
    show: false,
    type: "none",
    data: null
});

export default EditStore;
