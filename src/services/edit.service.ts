import type { EditMode, EditResultCallback } from "../interfaces/editmode";
import type { EditbarAction } from "../interfaces/editbar-action";
import EditStore from "../stores/edit.store";
import type { EditData } from "../interfaces/edit-data";
import ImageService from "./image.service";

export class EditService {
  static clearEditStore() {
    EditStore.set({
      show: false,
      type: "none",
      clickX: 0,
      clickY: 0,
      data: {
        elementId: "",
        sectionId: "",
        role: "none",
      },
      role: "none",
      result: null
    });
  }

  static editSectionImage(action: EditbarAction, sectionId: string) {
    const editMode: EditMode = {
      show: true,
      type: "image",
      clickX: action.clickX,
      clickY: action.clickY,
      role: action.role,
      data: {
        sectionId,
        elementId: "",
        role: action.role,
      },
      result: null
    };
    EditStore.set(editMode);
  }

  static editTitle(action: EditbarAction, sectionId: string, text: string) {
    return new Promise((resolve, reject) => {
      EditStore.set({
        show: true,
        type: "single",
        clickX: action.clickX,
        clickY: action.clickY,
        role: action.role,
        data: {
          sectionId,
          elementId: "",
          text,
          role: action.role,
        },
        result: (value: string) => resolve(value)
      });
    });
    
  }

  static editSectionDescription(
    action: EditbarAction,
    sectionId: string,
    text: string
  ) {
    EditStore.set({
      show: true,
      type: "multi",
      clickX: action.clickX,
      clickY: action.clickY,
      role: action.role,
      data: {
        sectionId,
        elementId: "",
        html: text,
        role: action.role,
      },
      result: null
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
