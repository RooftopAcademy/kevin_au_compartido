export class Catalog {
  constructor() {
    this._products = []
  }

  addProduct(product) {
    this._products.push(product)
  }

  findProductById(id) {
    return this._products.find(p => p.id == id)
  }
}