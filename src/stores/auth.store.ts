import type User from "../interfaces/user";
import AuthService from "../services/auth.service";
import { writable } from "svelte/store";

const AuthStore = writable<User | null>(null);

export function getAuthUser() {
    const store = writable<Promise<User | null>>(new Promise(() => {}));

    const load = async () => {
        const user = await AuthService.getUserInit();
        store.set(Promise.resolve(user));
    }

    load();
    return store;
}

export default AuthStore;
