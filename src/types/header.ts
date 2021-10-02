import { IUser } from "./user";

export interface IHeader {
  state : {
    cartBadge: number
  }
  template: () => string
  initialize: (arg0: string) => void
  setCartCount: (arg0: number) => void
  updateCartBadgeUI: () => void
  showCart: () => void
  hideCart: () => void
  incrementBadgeByOne: () => void
  decrementBadgeByOne: () => void
}
