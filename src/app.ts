import { IProduct } from './types/products'
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

  // DOM MANIPULATION
  const $cartDOM = document.querySelector('.cart');
  const $cartOverlay = document.querySelector('.cart-overlay');

  document.addEventListener('click', function(e) {
    const target = e.target as Element
    if(target && target.classList.contains('add-cart')){
      e.preventDefault()
      const [product] = products.filter(p => p.id == target.getAttribute('data-laptop-id'))
      Header.incrementCartBadge()
    }
  })
})

// Home.updateCart(Header.incrementCartBadge.bind(Header))
