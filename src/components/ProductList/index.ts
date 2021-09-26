import { IProduct } from "../../types/products"
import { Product } from "../Product"

export const ProductList = {
  state : {
    products: [] as IProduct[],
  },
  template() {
    return `
      <section id="laptops__container" class="laptops__container">
        <h2 class="laptops__title">Featured Laptops</h2>  
        <div class="laptops__list js-products-list">
        ${this.state.products.map(p => Product.initialize(p)).join('')}
        </div>
      </section>
    `
  },
  initialize(products: IProduct[] = []) {
    this.state.products = []
    this.state.products.push(...products)
    document.querySelector('#content')!.innerHTML = this.template()
    // this.setEventListenerToProducts()
  },
  // setEventListenerToProduct() {    
  //   document
  //     .querySelector(`[data-laptop-id="${p.id}"]`)
  //     ?.addEventListener('click', function() {
  //       console.log(p)
  //     })
    
  // }
}
