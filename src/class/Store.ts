import { Cart } from './Cart.js'

export class Store {
  cart: Cart

  constructor() {
    this.cart = new Cart
  }

  getCart() {
    return this.cart
  }
}
