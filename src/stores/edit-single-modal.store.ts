import { writable } from "svelte/store";

export type EditResultCallback2 = (value: string) => void;
export interface EditMode2 {
    show: boolean;
    clickY: number;
    data: string;
    result: EditResultCallback2 | null
}

const EditSingleModalStore = writable<EditMode2>({
    show: false,
    clickY: 0,
    data: "";
    result: null
});

export default EditSingleModalStore;
