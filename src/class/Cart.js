export class Cart {
  constructor() {
    this.products = []
  }

  add(product) {
    if (product) {
      this.products.push(product)
    } else {
      throw new Error('Invalid Product')
    }
  }
}