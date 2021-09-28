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
        <button id="js-clear-cart" class="js-clear-cart clear-cart button">CLEAR CART</button>
      </div>
    </div>
    `
  },
  initialize() {
    document.getElementById('cart-overlay')!.innerHTML = this.template()

    document.getElementById('close-cart')!.addEventListener('click', this.hideCart)
  },
  addProduct(product: IProduct) {
    const indexOfProductInCart = this.state.products.findIndex(p => p.id === product.id)

    let isNewProduct = false

    if ( indexOfProductInCart === -1 ) {
      this.state.products.push({...product, amount: 1})
      isNewProduct = true
      this.updateCartUIOnAdd(product, isNewProduct)
    } else {
      // const productInCart = this.state.products[indexOfProductInCart]
      // const amount = productInCart.amount as number
      // productInCart.amount = (amount + 1)
      this.state.products[indexOfProductInCart].amount!++
      this.updateCartUIOnAdd(this.state.products[indexOfProductInCart], isNewProduct)
    }
  },
  updateCartUIOnAdd(product: IProduct, isNewProduct: boolean) {
    const $cart = document.querySelector('.cart-content') as HTMLElement
    if(isNewProduct) {
      $cart.appendChild(CartItem.initialize(product))
    } else {
      const $cartItemAmount = document.querySelector(`.item-amount[data-id="${product.id}"]`) as HTMLParagraphElement
      $cartItemAmount.innerText = product.amount!.toString()
    }
    // update total amount ui
    this.updateTotalAmount()
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
    // update total amount ui
    this.updateTotalAmount()
  },
  removeItem(id) {
    this.state.products = this.state.products.filter(p => p.id !== id)
    // clean in dom
    const $cart = document.querySelector('.cart-content') as Node
    const $productToRemove = document.querySelector(`.js-remove-cart-item[data-id="${id}"]`)?.parentElement?.parentElement as Node
    $cart.removeChild($productToRemove)

    // update total amount ui
    this.updateTotalAmount()
  },
  updateTotalAmount() {
    const $cartTotal = document.querySelector('.cart-total') as HTMLElement
    const totalAmount = this.state.products.reduce((acc, cur) => (parseFloat(acc) + parseFloat(cur.price) * cur.amount!).toFixed(2), '0')
    $cartTotal.innerText = totalAmount
  },
  getQuantityOfProductsInCart() {
    return this.state.products.reduce((acc, p) => acc + p.amount!, 0)
  },
  incrementProductQuantity(id: string, target: HTMLElement) {
    const product = this.state.products.find(p => p.id === id) as IProduct
    const amount = product.amount!++
    const pTag = target.nextElementSibling as HTMLParagraphElement
    pTag.innerText = (amount + 1).toString()
    this.updateTotalAmount()
  },
  decrementProductQuantity(id: string, target: HTMLElement){
    const product = this.state.products.find(p => p.id === id) as IProduct
    if( product.amount! > 0 ) {
      const amount = product.amount!--
      if(amount - 1 === 0) {
        this.removeItem(id)
        return;
      }
      const pTag = target.previousElementSibling as HTMLParagraphElement
      pTag.innerText = (amount - 1).toString()
      this.updateTotalAmount()
    }
  }
}
// document.getElementById('js-clear-cart')!.addEventListener('click', () => this.clearCart())
