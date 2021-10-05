/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
import { ICart } from "../../types/cart"
import { IProduct } from "../../types/products"
import useLocalStorage from "../../utils/useLocalStorage"
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
        ${this.state.products.map(p => CartItem.initialize(p).outerHTML).join('')}
      </div>
      <div class="cart-footer">
        <h3>your total: $ <span class="cart-total">${this.state.products.reduce((acc, cur) => (parseFloat(acc) + parseFloat(cur.price) * cur.amount!).toFixed(2), '0')}</span></h3>
        <button id="js-clear-cart" class="js-clear-cart clear-cart button">CLEAR CART</button>
      </div>
    </div>
    `
  },
  initialize($cart) {
    // get cart from localStorage
    const _cart_ = useLocalStorage.get('_cart_')
    if ( _cart_ ) this.state.products = [...JSON.parse(_cart_)]
    
    document.getElementById($cart)!.innerHTML = this.template()

    document.getElementById('close-cart')!.addEventListener('click', this.hideCart)
    document.getElementById('cart-overlay')!.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        // eslint-disable-next-line no-unused-expressions
        target.id === 'cart-overlay' && this.hideCart()
      }
    )
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
    // update storage
    useLocalStorage.set('_cart_', JSON.stringify(this.state.products))
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
    useLocalStorage.delete('_cart_')
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
    
    // removeItem from localstorage
    useLocalStorage.set('_cart_', JSON.stringify(this.state.products))
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
    useLocalStorage.set('_cart_', JSON.stringify(this.state.products))
  },
  decrementProductQuantity(id: string, target: HTMLElement){
    const product = this.state.products.find(p => p.id === id) as IProduct
    if( product.amount! > 0 ) {
      const amount = product.amount!--
      if(amount - 1 === 0) {
        this.removeItem(id)
        useLocalStorage.set('_cart_', JSON.stringify(this.state.products))
        return;
      }
      const pTag = target.previousElementSibling as HTMLParagraphElement
      pTag.innerText = (amount - 1).toString()
      this.updateTotalAmount()
      useLocalStorage.set('_cart_', JSON.stringify(this.state.products))
    }
  }
}
