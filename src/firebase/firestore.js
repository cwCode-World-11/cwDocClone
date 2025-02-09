import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";
import { firestore } from "./firebaseConfig";

async function create(userId, dataObj) {
  try {
    const docRef = doc(firestore, "User", userId);
    const gettingDoc = await getDoc(docRef);
    if (gettingDoc.exists()) {
      const data = gettingDoc.data();
      if ("doc" in data) {
        // field already exist
        await updateDoc(docRef, { doc: arrayUnion(dataObj) });
      } else {
        // create new field
        await setDoc(docRef, { doc: [dataObj] });
      }
    } else {
      // create new document
      await setDoc(docRef, { doc: [dataObj] });
    }
  } catch (error) {
    console.error("error:", error);
  }
}
async function read(userId) {
  try {
    const docRef = doc(firestore, "User", userId);
    const dataSnap = await getDoc(docRef);
    if (dataSnap.exists()) {
      return dataSnap.data();
    } else {
      alert("No document found");
    }
  } catch (error) {
    console.error("error:", error);
  }
}
async function update(userId, dataObj) {
  try {
    await updateDoc(doc(firestore, "User", userId), dataObj);
  } catch (error) {
    console.error("error:", error);
  }
}

export { create, read, update };
