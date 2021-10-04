import { IProduct } from "../../types/products"
import { Pagination } from "../Pagination"
import { Product } from "../Product"


export const ProductList = {
  state : {
    products: [] as IProduct[],
    paginatedProducts: [] as IProduct[],
    paginate: {
      currentPage:1,
      productsPerPage: 3
    }
  },
  template() {
    return `
      <section id="laptops__container" class="laptops__container">
        <h2 class="laptops__title">Featured Laptops</h2>  
        <div class="laptops__list js-products-list">
        ${this.state.paginatedProducts.map(p => Product.initialize(p)).join('')}
        </div>
      </section>
      ${Pagination.initialize({
        productsPerPage: this.state.paginate.productsPerPage,
        totalProducts: this.state.products.length,
        currentPage: this.state.paginate.currentPage
      })}
    `
  },
  initialize(products: IProduct[] = []) {
    this.state.products = []
    this.state.products.push(...products)
    
    this.updateUI()
  },
  paginate() {
    const { currentPage, productsPerPage } = this.state.paginate
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    this.state.paginatedProducts = this.state.products.slice(indexOfFirstProduct, indexOfLastProduct)
  },
  handlePaginate(e: Event) {
    e.preventDefault()
    // change Current Page
    this.state.paginate.currentPage = Number((e.target as HTMLElement).innerText)
    
    this.updateUI()
  },
  updateUI() {
    this.paginate()
    document.querySelector('#content')!.innerHTML = this.template()

    // add event to pagination links
    document.querySelector('.pagination')!.addEventListener('click', this.handlePaginate.bind(this))
  }
}
