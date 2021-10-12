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

const sortParams:sortParamsType = {
  price: 1,
  category: 1,
  name: 1,
  id: 1
}

const products: IProduct[] = [
  {
      "id": "1",
      "imgUrl": "assets/img/alienware4.png",
      "name": "Alienware m15",
      "category": "Laptop",
      "price": "999.99"
  },
  {
      "id": "2",
      "imgUrl": "assets/img/alienware3.png",
      "name": "Alienware R4",
      "category": "Gaming",
      "price": "1399.89"
  },
  {
      "id": "3",
      "imgUrl": "assets/img/alienware2.png",
      "name": "Alienware 17",
      "category": "Gaming",
      "price": "1299.89"
  },
  {
      "id": "4",
      "imgUrl": "assets/img/alienware4.png",
      "name": "Alienware Special",
      "category": "Laptop",
      "price": "599.99"
  },
  {
      "id": "5",
      "imgUrl": "assets/img/alienware3.png",
      "name": "Alienware 2021",
      "category": "Laptop",
      "price": "1799.89"
  },
  {
      "id": "6",
      "imgUrl": "assets/img/alienware6.png",
      "name": "Alienware Desktop",
      "category": "Desktop",
      "price": "1899.89"
  },
  {
      "id": "7",
      "imgUrl": "assets/img/alienware7.png",
      "name": "Alienware Kit",
      "category": "Desktop",
      "price": "899.89"
  }
]

const { products: productsList} = Products(products)
console.log(productsList.getMappedProductsByKey(sortParams))
console.log(productsList.getMappedProductsByCategory())
