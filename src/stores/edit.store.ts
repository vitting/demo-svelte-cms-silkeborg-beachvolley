import type { EditMode } from "../interfaces/editmode";
import { writable } from "svelte/store";

const EditStore = writable<EditMode>({
    show: false,
    type: "none",
    clickX: 0,
    clickY: 0,
    data: {
        elementId: "",
        sectionId: "",
        role: "none"
    },
    role: "none",
    result: null
});

export default EditStore;
