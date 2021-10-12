import { IUser } from "./user";

export interface IAuth {
  currentUser: IUser | null
  email: string
  password: string
}
