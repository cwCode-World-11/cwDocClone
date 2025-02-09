import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,sendPasswordResetEmail} from "firebase/auth"
import { auth } from "./firebaseConfig";

async function signUp(email,password){
    try {
        return await createUserWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log('sign panna pothu vara error :', error)
        alert(error)
    }
}

async function logIn(email,password) {
    try {
        return signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log('error:', error)
        alert(error)
    }
}

async function logOut() {
    try {
        return await signOut(auth)
    } catch (error) {
        console.log('error:', error)
        alert(error)
    }
}

async function resetPassword(email) {
    try {
        return await sendPasswordResetEmail(auth,email)
    } catch (error) {
        console.log('error:', error)
        alert(error)
    }
}

export {signUp,logIn,logOut,resetPassword}