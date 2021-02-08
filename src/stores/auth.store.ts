import { writable } from "svelte/store";

const AuthStore = writable<boolean>(false);

export default AuthStore;
