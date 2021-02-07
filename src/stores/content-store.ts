import { writable } from "svelte/store";
import type { Content } from "../interfaces/content";

const ContentStore = writable<Content[]>([]);

export default ContentStore;
