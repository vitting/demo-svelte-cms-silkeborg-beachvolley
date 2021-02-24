import type { EditbarAction } from "../interfaces/editbar-action";
import type { EditData } from "../interfaces/edit-data";
import ImageService from "./image.service";
import EditSingleModalStore from "../stores/edit-single-modal.store";
import EditEditorModalStore from "../stores/edit-editor-modal.store";
import EditImageModalStore from "../stores/edit-image-modal.store";
import type { ImageData } from "../interfaces/image-data";

export class EditService {
  static editImageModal(
    data: string = "",
    aspectRatioSquare = false,
    resizeCroppedImage = false,
    resizeWidth = 500,
    resizeHeight = 500
  ) {
    return new Promise<ImageData | null>((resolve, reject) => {
      try {
        EditImageModalStore.set({
          show: true,
          aspectRatioSquare,
          resizeCroppedImage,
          resizeHeight,
          resizeWidth,
          result: (value: ImageData | null) => resolve(value),
          data: data,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  static editEditorModal(action: EditbarAction, text: string) {
    return new Promise<string | null>((resolve, reject) => {
      try {
        EditEditorModalStore.set({
          show: true,
          result: (value: string | null) => resolve(value),
          data: text,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  static editSingleModal(action: EditbarAction, text: string) {
    return new Promise<string | null>((resolve, reject) => {
      try {
        EditSingleModalStore.set({
          show: true,
          result: (value: string | null) => resolve(value),
          data: text,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  static async prepareHtmlToSave(data: EditData): Promise<string> {
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(data.html!, "text/html");
    const images = doc.querySelectorAll("img");
    for (const image of images) {
      // Remove style attrb if it exists.
      // If we save in editor with a image selected it has a curser resize
      image.removeAttribute("style");

      // Rezise image to a max-width
      let resize_to = image.width;
      if (image.width === 0 || image.width > 500) {
        resize_to = 500;
      }

      const data = await ImageService.resize(image, resize_to);
      const uploadData = await ImageService.uploadImages(
        data.dataWebp,
        data.dataJpeg,
        data.width,
        data.height
      );
      image.src = uploadData.urlJpeg;
    }

    return doc.body.innerHTML;
  }
}
