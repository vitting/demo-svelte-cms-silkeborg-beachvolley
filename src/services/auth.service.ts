import AuthStore from "../stores/auth.store";
import { auth } from "../init-firebase";
import type User from "../interfaces/user";

export default class AuthService {
    static async login(email: string, password: string) {
        return auth.signInWithEmailAndPassword(email, password);        
    }

    static async logout() {
        return auth.signOut();
    }

    static getUser() {
        return auth.currentUser;
    }

    static getUserInit(): Promise< User | null> {
        return new Promise< User | null>((resolve, rejet) => {
            auth.onAuthStateChanged((user) => {
                let result: User | null = null;
                if (user) {
                    result = {
                        id: user.uid,
                        email: user.email ?? "",
                        name: user.displayName ?? ""
                    };
                }
                AuthStore.set(result);
                resolve(result)
            });
        })
        
    }
}