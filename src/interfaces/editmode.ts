import type { ContentSection } from "./content-section";
import type { EditData } from "./edit-data";
import type { EditRole } from "./edit-role";

export type EditResultCallback = (value: string) => void;
export interface EditMode {
    show: boolean;
    type: editType;
    role: EditRole
    clickX: number;
    clickY: number;
    data: EditData;
    result: EditResultCallback | null
}

type editType = "none" | "single" | "multi" | "image"