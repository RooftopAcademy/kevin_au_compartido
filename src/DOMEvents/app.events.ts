import { IAddProductToCartEvent, IClearCartEvent, IRemoveItemInCartEvent } from "../types/DOMEvents"
import useLocalStorage from "../utils/useLocalStorage"

export const addProductToCart = (params: IAddProductToCartEvent) => {
  const { target, products, Cart, Header } = params
  const [product] = products.filter(p => p.id == target.getAttribute('data-laptop-id'))
  Cart.addProduct(product)
  useLocalStorage.set('_cart_', JSON.stringify(Cart.state.products))
  Header.setCartCount(Cart.getQuantityOfProductsInCart())
}

export const clearCart = (params: IClearCartEvent) => {
  const { Cart, Header } = params
  Cart.clearCart()
  Header.setCartCount(Cart.getQuantityOfProductsInCart())
}

export const removeItemInCart = (params: IRemoveItemInCartEvent) => {
  const { e , Cart, Header } = params
  const target = e.target as HTMLElement
  const id = target.dataset.id
  Cart.removeItem(id)
  Header.setCartCount(Cart.getQuantityOfProductsInCart())
}

export const defaultEvent = (params?: any) => {
  return;
}
