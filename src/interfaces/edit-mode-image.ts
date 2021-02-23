import type { EditImageResultCallback } from "./edit-image-result-callback";

export interface EditModeImage {
    show: boolean;
    positionY: number;
    aspectRatioSquare: boolean;
    resizeCroppedImage: boolean;
    resizeWidth: number;
    resizeHeight: number;
    data: string;
    result: EditImageResultCallback | null
}