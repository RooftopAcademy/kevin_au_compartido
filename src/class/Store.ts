import { Cart } from './Cart'

export class Store {
  cart: Cart

  constructor() {
    this.cart = new Cart
  }

  getCart() {
    return this.cart
  }
}
