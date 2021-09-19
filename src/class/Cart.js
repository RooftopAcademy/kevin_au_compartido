export class Cart {
  constructor() {
    this.products = []
  }

  add(product) {
    if (product instanceof Product) {
      this.products.push(product)
    } else {
      throw new Error('Only typeof Product is supported')
    }
  }
}