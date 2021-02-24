import type { EditResultCallback } from "./edit-result-callback";

export interface EditMode {
    show: boolean;
    data: string;
    result: EditResultCallback | null
}