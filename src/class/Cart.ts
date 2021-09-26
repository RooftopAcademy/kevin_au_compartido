import { IProduct } from '../types/products'

export class Cart {
  products: IProduct[]

  constructor() {
    this.products = []
  }

  add(product: IProduct) {
    if (product) {
      this.products.push(product)
    } else {
      throw new Error('Invalid Product')
    }
  }
}