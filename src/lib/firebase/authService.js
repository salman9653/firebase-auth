import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";

import { app } from "./firebaseConfig";

export class FirebaseAuthService {
  auth;

  constructor() {
    this.auth = getAuth(app)
  }

  // Get Current User
  async getCurrentUser() {
    try {
      const user = this.auth?.currentUser;
      return user ? user : null;
    } catch (error) {
      console.log("Error getting current user:", error);
      throw error;
    }
  }

  // Email/Password Authentication
  async createAccount({ name, email, password }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Email Verification
  async sendEmailVerification() {
    try {
      await sendEmailVerification(this.auth.currentUser);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Email and Password Login
  async credentialLogin({ email, password }) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Magic Link Authentication
  async sendMagicLink({ email, actionCodeSettings }) {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Magic Link Login
  async signInWithMagicLink({ email, emailLink }) {
    try {
      if (!isSignInWithEmailLink(auth, emailLink)) {
        throw new Error("Invalid magic link");
      }
      const userCredential = await signInWithEmailLink(auth, email, emailLink);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Google Authentication
  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    } catch (error) {
      throw error;
    }
  }

  // GitHub Authentication
  async signInWithGitHub() {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    } catch (error) {
      throw error;
    }
  }

  // Sign Out
  async signOutUser() {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // send password reset email
  async sendPasswordResetEmail({ email }) {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // update password
  async updatePassword({ password }) {
    try {
      await updatePassword(this.auth.currentUser, password);
      return true;
    } catch (error) {
      throw error;
    }
  }

  //reauthenticate user
  async reauthenticateUser({ password }) {
    try {
      await reauthenticateWithCredential(this.auth.currentUser, password);
      return true;
    } catch (error) {
      throw error;
    }
  }
  // update email
  async updateEmail({ email }) {
    try {
      await updateEmail(this.auth.currentUser, email);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // update name
  async updateName({ name }) {
    try {
      await updateProfile(this.auth.currentUser, {
        displayName: name,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  // update display photo
  async updateProfilePic({ photoURL }) {
    try {
      await updateProfile(this.auth.currentUser, {
        photoURL: photoURL,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  // delete user
  async deleteUser() {
    try {
      await deleteUser(this.auth.currentUser);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

const authService = new FirebaseAuthService();
export default authService;
