import { writable } from "svelte/store";

const LoadingSpinnerStore = writable<boolean>(false);

export default LoadingSpinnerStore;
