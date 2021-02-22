import type { EditRole } from "./edit-role";

export interface EditData {
    text?: string;
    sectionId: string;
    elementId: string;
    html?: string;
    image?: string;
    role: EditRole
}

