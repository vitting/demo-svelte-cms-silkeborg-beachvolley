import type { EditMode } from "src/interfaces/editmode";
import { writable } from "svelte/store";

const EditStore = writable<EditMode>({
    show: false,
    type: "none",
    clickX: 0,
    clickY: 0,
    data: null
});

export default EditStore;
