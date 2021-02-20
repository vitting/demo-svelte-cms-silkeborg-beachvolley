import type User from "src/interfaces/user";
import { writable } from "svelte/store";

const AuthStore = writable<User | null>(null);

export default AuthStore;
