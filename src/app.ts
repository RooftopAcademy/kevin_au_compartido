import { IProduct } from './types/products'
import { addProductToCart, clearCart, removeItemInCart } from './DOMEvents'
import { Home } from './components/Home'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ProductList } from './components/ProductList'
import { ProductDetail } from './components/ProductDetail'
import { Notfound } from './components/Notfound'
import { Cart } from './components/Cart'

document.addEventListener("DOMContentLoaded" , async () => {

  Header.initialize()
  Home.initialize()
  Cart.initialize()
  Footer.initialize()

  const res = await fetch('https://my-json-server.typicode.com/kevin-dev71/JSON-server/products')
  const products: IProduct[] = await res.json()
  
  // HASH ROUTE EVENT
  window.addEventListener("hashchange", onRouteChanged)
  
  // Handle Route
  function onRouteChanged() {
    const hash = window.location.hash.split('=')
    switch(hash[0]) {
      case '#home': 
        Home.initialize()
        break
      case '#products': 
        ProductList.initialize(products)
        break
      case '#product-detail':
        const product = products.filter(p => p.id == hash[1])
        ProductDetail.initialize(product)
        break
      default:
        Notfound.initialize()
    }
  }

  document.addEventListener('click', function(e) {
    const target = e.target as HTMLElement
    if(!target) return;
    // ADD PRODUCT CLLICK EVENT
    if(target.classList.contains('add-cart')){
      e.preventDefault()
      addProductToCart({target, products, Cart, Header})
      return;
    }

    // CLEAR CART EVENT
    if(target.classList.contains('clear-cart')) {
      clearCart({Cart, Header})
      return;
    }

    // REMOVE ITEM IN CART EVENT
    if(target.classList.contains('remove-cart-item')) {
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
      return;
    }
  })
})

// Home.updateCart(Header.incrementCartBadge.bind(Header))
// ROUTE
  // const ROUTES = {
  //   '#home': Home.initialize,
  //   '#products': () => ProductList.initialize(products),
  //   '#product-detail': (product: IProduct[]) => ProductDetail.initialize(product),
  //   'default' : Notfound.initialize
  // }
