import DatabaseService from "../services/database.service";
import { writable } from "svelte/store";
import type { Content } from "../interfaces/content";

let cache: Content[] = [];

export function getPageData() {
    const store = writable<Promise<Content[]>>(new Promise(() => {}));

    if (cache) {
        store.set(Promise.resolve(cache));
    }

    const load = async () => {
        const content = await DatabaseService.getSiteData();
        if (content) {
            cache = [content];
            store.set(Promise.resolve(cache));
        }
    }

    load();
    return store;
}

