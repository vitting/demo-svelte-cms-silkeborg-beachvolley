import type { EditData } from "./edit-data";

export interface EditMode {
    show: boolean;
    type: editType;
    clickX: number;
    clickY: number;
    data: EditData | null;
}

type editType = "none" | "single" | "multi" | "image"