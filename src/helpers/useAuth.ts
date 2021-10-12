import { auth } from "../firebase"
import { IUser } from "../types/user"

// const useAuth: IAuth = {
//   currentUser: null,
//   setCurrentUser(user: IUser){
//     this.currentUser = user
//   },
//   signup(user: IUser) {
//     return auth.createUserService(user)
//   }

//   auth.onAuthStateChangedService((user) => setCurrentUser(user))

// }
export const useAuth = () => {
  let currentUser: IUser | null = null

  function getCurrentUser() {
    return currentUser
  }

  function setCurrentUser(value: IUser) {
    currentUser = value
  }

  async function signup(user: IUser) {
    const createdUser = await auth.createUserService(user)
    setCurrentUser(createdUser)
  }
  
  return {
    getCurrentUser,
    signup
  }
}
