import { initializeApp } from "firebase/app"
import { 
  getFirestore,
  collection,
  addDoc,
  getDocsFromServer
} from "firebase/firestore"

import firebaseConfig from "./config" // your private firebase apikey
// TYPES
import { IProduct } from "./types/products"
import { IUser } from "./types/user"


// Initialize Firebase
initializeApp(firebaseConfig)

const db = getFirestore()

export const createUserService = async (user: IUser) => {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}

export const createProductService = async (product: IProduct) => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    console.log("Document written with ID: ", docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}

export const getProductsService = async () => {
  const querySnapshot = await getDocsFromServer(collection(db, "products"))
  const products: IProduct[] = []
  await querySnapshot.forEach((doc) => {
    products.push(doc.data() as IProduct)
  })
  return products
}
