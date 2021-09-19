import { UI } from './class/UI.js'
import { Store } from './class/Store.js'

// DATA
let products = [
  {
    imgUrl: 'assets/img/alienware4.png',
    name: 'Alienware m15',
    category: 'Gaming',
    price: '999.99'
  },
  {
    imgUrl: 'assets/img/alienware3.png',
    name: 'Alienware R4',
    category: 'Gaming',
    price: '1399.89'
  },
  {
    imgUrl: 'assets/img/alienware2.png',
    name: 'Alienware 17',
    category: 'Gaming',
    price: '1299.89'
  },
]

// OBJECTS
const store = new Store()
const ui = new UI()

// DOM REF
const productListDOM = document.querySelector('.js-products-list')

ui.displayProducts(productListDOM, products)