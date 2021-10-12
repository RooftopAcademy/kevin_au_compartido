// TS INTERFACES
import { IProduct } from './types/products'
// CONSTANTS
import { path } from './constants/paths'
import { DOM } from './constants/domElements'
// DOM EVENT FUNCTIONS
import { addProductToCart, clearCart, removeItemInCart } from './DOMEvents'
// FIREBASE
import { getProductsService } from './firebase'
// COMPONENTS
import { Home } from './components/Home'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ProductList } from './components/ProductList'
import { ProductDetail } from './components/ProductDetail'
import { Notfound } from './components/Notfound'
import { Cart } from './components/Cart'
import { LoginForm } from './components/Login'
// HELPERS AND UTILS
import { useAuth } from './helpers/useAuth'
import { sortParamsType } from './types/sort'
import { Products } from './helpers/sort'

export const { signup, getCurrentUser } = useAuth()

document.addEventListener("DOMContentLoaded" , async () => {

  Cart.initialize(DOM.$cart)
  Header.initialize(DOM.$header, Cart)
  Home.initialize(DOM.$content)
  Footer.initialize(DOM.$footer)
  LoginForm.initialize()

  const products: IProduct[] = await getProductsService()
  
  // Handle Route
  function onRouteChanged() {
    const [paths, productID] = window.location.hash.split('/')
    const product = products.filter(p => p.id === productID)

    switch(paths) {
      case path.HOME: 
        Home.initialize(DOM.$content)
        break
      case path.PRODUCTS: 
        ProductList.initialize(products)
        break
      case path.PRODUCT_DETAIL:
        ProductDetail.initialize(product)
        break
      default:
        Notfound.initialize()
    }
  }

  // HASH ROUTE EVENT
  window.addEventListener("hashchange", onRouteChanged)

  // GLOBAL EVENTS
  function globalEvents(e: Event) {
    const target = e.target as HTMLElement
    if(!target) return;
    // ADD PRODUCT CLLICK EVENT
    if(target.classList.contains('js-add-cart')){
      e.preventDefault()
      addProductToCart({target, products, Cart, Header})
      return;
    }

    // CLEAR CART EVENT
    if(target.classList.contains('js-clear-cart')) {
      clearCart({Cart, Header})
      return;
    }

    // REMOVE ITEM IN CART EVENT
    if(target.classList.contains('js-remove-cart-item')) {
      removeItemInCart({e, Cart, Header})
      return;
    }

    // INCREMENT CART ITEM QUANTITY
    if(target.classList.contains('arrow-up')) {
      const id = target.dataset.id as string
      Cart.incrementProductQuantity(id, target)
      Header.incrementBadgeByOne()
      return;
    }

    // DECREMENT CART ITEM QUANTITY
    if(target.classList.contains('arrow-down')) {
      const id = target.dataset.id as string
      Cart.decrementProductQuantity(id, target)
      Header.decrementBadgeByOne()
    }

    // TODO: CLOSE LOGIN FORM ON CLICK ANYWHERE

  }

  document.addEventListener('click', globalEvents)
})

// const sortParams:sortParamsType = {
//   price: 1,
//   category: 1,
//   name: 1,
//   id: 1
// }
