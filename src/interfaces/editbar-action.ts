import type { EditRole } from "./edit-role"

export type EditbarAction = {
    action: string;
    clickX: number;
    clickY: number;
    role: EditRole
}