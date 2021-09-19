import { UI } from './class/UI.js'
import { Store } from './class/Store.js'

// DATA
let products = [
  {
    id: 1,
    imgUrl: 'assets/img/alienware4.png',
    name: 'Alienware m15',
    category: 'Gaming',
    price: '999.99'
  },
  {
    id: 2,
    imgUrl: 'assets/img/alienware3.png',
    name: 'Alienware R4',
    category: 'Gaming',
    price: '1399.89'
  },
  {
    id: 3,
    imgUrl: 'assets/img/alienware2.png',
    name: 'Alienware 17',
    category: 'Gaming',
    price: '1299.89'
  },
]

document.addEventListener("DOMContentLoaded" , () => { 
  // OBJECTS
  const store = new Store()
  const ui = new UI()  

  // DOM REF
  const productListDOM = document.querySelector('.js-products-list')
  const productDetailDOM = document.querySelector('#detail__section')

  // EVENTS FUNCTION
  function showDetails(productId) {
    const [product] = products.filter(p => p.id == productId)
    ui.showProductDetail(productDetailDOM, product)
  }
  
  // MAIN
  ui.displayProducts(productListDOM, products)

  // ADD EVENT LISTENER TO document, so... can propagate events to dinamic elements
  document.addEventListener('click' , function({target}) {
    // VIEW MORE BUTTON
    if(target && target.classList.contains('laptop__button')){
      showDetails(target.getAttribute('data-laptop-id'))
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
