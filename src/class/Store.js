import { Cart } from './Cart.js'
import { Catalog } from './Catalog.js'

export class Store {
  constructor() {
    this._catalog = new Catalog
    this._cart = new Cart
  }

  fetchProducts() {
    this.catalog.addProduct( new Product )
  }

  getCart() {
    return this._cart
  }
}
