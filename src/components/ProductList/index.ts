import { Products } from "../../helpers/sort"
import { IProduct } from "../../types/products"
import { Pagination } from "../Pagination"
import { Product } from "../Product"
import './style.css'

export const ProductList = {
  state : {
    products: [] as IProduct[],
    paginatedProducts: [] as IProduct[],
    paginate: {
      currentPage:1,
      productsPerPage: 3
    },
    categories: [] as string[]
  },
  template() {
    return `
      <section id="laptops__container" class="laptops__container">
        <h2 class="laptops__title">Featured Laptops</h2>
        <div class="laptops-filter__container">
        <select class="laptops-filter__select">
          <option value="" disabled selected>-- Sort By --</option>
          <option value="price_asc">Lowest Price First</option>
          <option value="price_desc">Higher Price First</option>
          <option value="name_asc">A - Z</option>
          <option value="name_desc">Z - A</option>
        </select>
        </div>
        <div class="laptops-list__main">
          <div class="laptops-filter__aside">
            <h4>Categories</h4>
            ${this.state.categories.map(category => 
              `<span class="laptops-filter__aside-category">${category}</span>`
            ).join('')}
            <h4>Filters</h4>
            <span class="laptops-filter__aside-category">Under 1000$</span>
          </div>
          <div class="laptops__list js-products-list">
            ${this.state.paginatedProducts.map(p => Product.initialize(p)).join('')}
          </div>
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
    const {products : productsList} = Products(this.state.products)
    const productsByCategoryMap = productsList.getMappedProductsByCategory()
    this.state.categories = Array.from(productsByCategoryMap.keys())
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
