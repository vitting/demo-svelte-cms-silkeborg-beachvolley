import { storage } from "../init-firebase";
import cuid from "cuid";

type imageType = "jpeg" | "webp";

export default class StorageService {
  private static path = "site/images/";
  static async addImage(
    data: string,
    filename: string,
    width: number,
    height: number,
    type: imageType
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const id = cuid();
      const ref = storage.ref(`${this.path}${id}.${type}`);

      const task = ref.putString(data, "data_url", {
        customMetadata: {
          originalFilename: filename,
          width: width.toString(),
          height: height.toString(),
        },
      });

      task.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        async () => {
          const imageUrl = await task.snapshot.ref.getDownloadURL();
          resolve(imageUrl);
        }
      );
    });
  }
}
