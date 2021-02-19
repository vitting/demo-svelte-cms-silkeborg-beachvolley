import { auth } from "../init-firebase";

export default class AuthService {
    static async login(email: string, password: string) {
        const user = await auth.signInWithEmailAndPassword(email, password);
        console.log(user);
        
    }
}