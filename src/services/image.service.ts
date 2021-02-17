import StorageService from "./storeage.service";

export type ImageData = {
  dataJpeg: string;
  dataWebp: string;
  width: number;
  height: number;
};

export type ImageUploadData = {
  urlWebp: string;
  urlJpeg: string;
};

export default class ImageService {
  static resize(
    image: HTMLImageElement,
    resizeToWidth: number
  ): Promise<ImageData> {
    return new Promise<ImageData>((resolve, reject) => {
      const tempImg = new Image();
      tempImg.onload = (e) => {
        const canvas = document.createElement("canvas");

        const scaleFactor = resizeToWidth / tempImg.width;
        const width = resizeToWidth;
        const height = tempImg.height * scaleFactor;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

        const dataJpeg = canvas.toDataURL("image/jpeg", 0.75);
        const dataWebp = canvas.toDataURL("image/webp", 0.75);

        return resolve({
          dataJpeg,
          dataWebp,
          width,
          height,
        });
      };

      tempImg.onerror = (error) => reject(error);

      tempImg.src = image.src;
    });
  }

  static async uploadImages(
    dataWebp: string,
    dataJpeg: string,
    width: number,
    height: number,
    filename: string = ""
  ): Promise<ImageUploadData> {
    const urlJpeg = await StorageService.addImage(
      dataJpeg,
      filename,
      width,
      height,
      "jpeg"
    );
    const urlWebp = await StorageService.addImage(
      dataWebp,
      filename,
      width,
      height,
      "webp"
    );

    return {
      urlJpeg,
      urlWebp,
    };
  }
}
