import { addProductToCart, clearCart, removeItemInCart, defaultEvent } from './app.events'

export const CLICK_TARGET = {
  'add-cart' : addProductToCart,
  'clear-cart': clearCart,
  'remove-cart-item': removeItemInCart,
  'default': defaultEvent
}

export { addProductToCart, clearCart, removeItemInCart } from './app.events'
