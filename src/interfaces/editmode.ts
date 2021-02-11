import type { EditData } from "./edit-data";

export interface EditMode {
    show: boolean;
    type: editType;
    data: EditData | null;
}

type editType = "none" | "single" | "multi" | "image"