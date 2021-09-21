import { UI } from './class/UI.js'
import { Store } from './class/Store.js'

document.addEventListener("DOMContentLoaded" , async () => {
  // OBJECTS
  const store = new Store()
  const ui = new UI()

  // DOM REF
  const productListDOM = document.querySelector('.js-products-list')
  const productDetailDOM = document.querySelector('#detail__section')
  const loadingDOM = document.querySelector('#loading')

  // LOAD DATA FROM API
  ui.displayLoading(loadingDOM, true)
  let res = await fetch('https://my-json-server.typicode.com/kevin-dev71/JSON-server/products')

  let products = await res.json()

  // MAIN
  ui.displayProducts(productListDOM, products)
  ui.displayLoading(loadingDOM, false)

  // ADD EVENT LISTENER TO document, so... can propagate events to dinamic elements
  document.addEventListener('click' , function({target}) {
    // VIEW MORE BUTTON
    if(target && target.classList.contains('laptop__button')){
      ui.showDetails(productDetailDOM, target.getAttribute('data-laptop-id'), products)
    }
    // ADD TO CART BUTTON
    if(target && target.classList.contains('add-cart')){
      const [product] = products.filter(p => p.id == target.getAttribute('data-laptop-id'))
      store.getCart().add(product)
      console.log(store)
      // ui.updateCart() // TODO
    }
  })
})
