import { ICartItem } from "../../types/cart"
import { IProduct } from "../../types/products"

export const CartItem: ICartItem = {
  state: {
    product: null
  },
  template() {
    const div = document.createElement('div')
    div.classList.add('cart-item')

    if(!this.state.product) {
      div.innerHTML = 'No Product Available'
      return div
    }
    
    div.innerHTML = `
      <img src=${this.state.product.imgUrl} alt=${this.state.product.name}>
      <div>
          <h4>${this.state.product.name}</h4>
          <h5>$${this.state.product.price}</h5>
          <span class="remove-cart-item js-remove-cart-item" data-id=${this.state.product.id}>remove</span>
      </div>
      <div>
          <i class="uil uil-angle-up arrow-up" data-id=${this.state.product.id}></i>
          <p class="item-amount" data-id=${this.state.product.id}>${this.state.product.amount}</p>
          <i class="uil uil-angle-down arrow-down" data-id=${this.state.product.id}></i>
      </div>
    `
    return div
  },
  initialize(product: IProduct) {
    const amount = product.amount ?? 1
    this.state.product = { ...product, amount }
    return this.template()
  },

}
