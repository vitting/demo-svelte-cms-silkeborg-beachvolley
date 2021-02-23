import type { EditResultCallback } from "./edit-result-callback";

export interface EditMode {
    show: boolean;
    positionY: number;
    data: string;
    result: EditResultCallback | null
}