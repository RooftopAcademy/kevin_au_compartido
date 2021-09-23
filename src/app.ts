import { UI } from './class/UI'
import { Store } from './class/Store'
import { IProduct } from './types/products'

document.addEventListener("DOMContentLoaded" , async () => {
  // OBJECTS
  const store = new Store()
  const ui = new UI()

  // DOM REF
  const productListDOM = document.querySelector('.js-products-list') as Element
  const productDetailDOM = document.querySelector('#detail__section') as Element
  const loadingDOM = document.querySelector('#loading') as Element

  // LOAD DATA FROM API
  ui.displayLoading(loadingDOM, true)
  let res = await fetch('https://my-json-server.typicode.com/kevin-dev71/JSON-server/products')

  let products: IProduct[] = await res.json()

  // MAIN
  ui.displayProducts(productListDOM, products)
  ui.displayLoading(loadingDOM, false)

  // ADD EVENT LISTENER TO document
  document.addEventListener('click' , function(e) {
    const target = e.target as Element
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
