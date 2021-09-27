import { ICart } from "../../types/cart"
import { IProduct } from "../../types/products"
import { CartItem } from "./CartItem"

export const Cart: ICart = {
  state: {
    products: [],
  },
  template() {
    return `
    <div class="cart">
      <span class="close-cart" id="close-cart">
        <i class="uil uil-times"></i>
      </span>
      <h2>your cart</h2>
      <div class="cart-content">
        <!-- CART ITEM -->
      </div>
      <div class="cart-footer">
        <h3>your total: $ <span class="cart-total">0</span></h3>
        <button id="js-clear-cart" class="clear-cart button">CLEAR CART</button>
      </div>
    </div>
    `
  },
  initialize() {
    document.getElementById('cart-overlay')!.innerHTML = this.template()

    document.getElementById('close-cart')!.addEventListener('click', this.hideCart)
  },
  addProduct(product: IProduct) {
    this.state.products.push(product)
    this.updateCartUIOnAdd(product)
  },
  updateCartUIOnAdd(product: IProduct) {
    const $cart = document.querySelector('.cart-content') as HTMLElement
    $cart.appendChild(CartItem.initialize(product))
  },
  hideCart() {
    const $cartDOM = document.querySelector('.cart')
    const $cartOverlay = document.querySelector('.cart-overlay')
    $cartOverlay!.classList.remove('transparentBcg')
    $cartDOM!.classList.remove('showCart')
  },
  clearCart() {
    const $cart = document.querySelector('.cart-content') as HTMLElement
    this.state.products.length = 0
    $cart.innerHTML = 'Your Cart Is Empty'
  },
  removeItem(id) {
    this.state.products = this.state.products.filter(p => p.id !== id)
    // clean in dom
    const $cart = document.querySelector('.cart-content') as Node
    const $productToRemove = document.querySelector(`.remove-cart-item[data-id="${id}"]`)?.parentElement?.parentElement as Node
    $cart.removeChild($productToRemove)
  }
}
// document.getElementById('js-clear-cart')!.addEventListener('click', () => this.clearCart())
