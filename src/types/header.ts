/* eslint-disable no-unused-vars */
import { ICart } from "./cart";

export interface IHeader {
  state : {
    cartBadge: number
  }
  template: () => string
  initialize: (arg0: string, arg1: ICart) => void
  setCartCount: (arg0: number) => void
  updateCartBadgeUI: () => void
  showCart: () => void
  hideCart: () => void
  incrementBadgeByOne: () => void
  decrementBadgeByOne: () => void
}
