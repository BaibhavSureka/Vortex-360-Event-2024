// Import the Firebase SDK
import 'firebase/app';
import fireapp  from '../database.js';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, getIdToken} from 'firebase/auth'
const auth = getAuth(fireapp);
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

class AuthService {
    static createUser = async (user,password) => {
        // Create a user with email and password
        return createUserWithEmailAndPassword(auth, user, password)
            .then((userCredential) => {
                // Return user created successfully
                return { success: true, message: 'User created successfully', user: userCredential.user };
            })
            .catch((error) => {
                // Return error if user creation fails
                return { success: false, message: error.message };
            });
    }

    // Method to fetch a user
    static loginUser = async (email, password) => {
        return signInWithEmailAndPassword(auth, email,password)
            .then((userCredential) => {
                // Signed in 
                return { success: true, message: 'User logged in successfully', user: userCredential.user };
            })
            .catch((error) => {
                return { success: false, message: error.message };
            });
    }

    static logout =  async () => {
        signOut(auth).then(() => {
          }).catch((error) => {
            return { success: false, message: error.message }
          });
    }

    static googleAuth = async (email,user) => {  
        getIdToken(user).then((string) => {
            return { success: true, message: 'User logged in successfully', user: user };
        }).catch((error) => {
            return { success: false, message: error.message };
        });
    }
}
export default AuthService;
