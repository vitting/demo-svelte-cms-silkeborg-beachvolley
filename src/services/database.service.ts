import type { Content } from "../interfaces/content";
import { db } from "../init-firebase";
import { testdata } from "../testdata";

export default class DatabaseService {
  private static siteDataId = "sitedata";
  private static siteCollection = "site";
  static addTestData() {
    return db
      .collection(this.siteCollection)
      .doc(this.siteDataId)
      .set(testdata);
  }

  static async getSiteData(): Promise<Content | undefined> {
    const doc = await db
      .collection(this.siteCollection)
      .doc(this.siteDataId)
      .get();

      if (doc.exists) {
          const data = doc.data() as Content;
          return data;
      }
  }
}
