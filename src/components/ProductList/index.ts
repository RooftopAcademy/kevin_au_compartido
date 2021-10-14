import { Products } from "../../helpers/sort"
import { IProduct } from "../../types/products"
import { IMappedProducts } from "../../types/sort"
import { Pagination } from "../Pagination"
import { Product } from "../Product"
import './style.css'

export const ProductList = {
  state : {
    products: [] as IProduct[],
    filteredProducts: [] as IProduct[],
    paginatedProducts: [] as IProduct[],
    paginate: {
      currentPage:1,
      productsPerPage: 3
    },
    categories: [] as string[],
    mappedProducts: {} as IMappedProducts,
    selectedValue: ''
  },
  template() {
    return `
      <section id="laptops__container" class="laptops__container">
        <h2 class="laptops__title">Featured Laptops</h2>
        <div class="laptops-filter__container">
        <select class="laptops-filter__select">
          <option value="" disabled ${this.state.selectedValue === '' && 'selected'}>-- Sort By --</option>
          <option value="price_asc" ${this.state.selectedValue === 'price_asc' && 'selected'}>Lowest Price First</option>
          <option value="price_desc" ${this.state.selectedValue === 'price_desc' && 'selected'}>Higher Price First</option>
          <option value="name_asc" ${this.state.selectedValue === 'name_asc' && 'selected'}>A - Z</option>
          <option value="name_desc" ${this.state.selectedValue === 'name_desc' && 'selected'}>Z - A</option>
        </select>
        </div>
        <div class="laptops-list__main">
          <div class="laptops-filter__aside">
            <h4>Categories</h4>
            ${this.state.categories.map(category => 
              `<span class="laptops-filter__aside-category">${category}</span>`
            ).join('')}
            <h4>Filters</h4>
            <span class="laptops-filter__aside-category">All</span>
            <span class="laptops-filter__aside-category">Under 1000$</span>
          </div>
          <div class="laptops__list js-products-list">
            ${this.state.paginatedProducts.map(p => Product.initialize(p)).join('')}
          </div>
        </div>
      </section>
      ${Pagination.initialize({
        productsPerPage: this.state.paginate.productsPerPage,
        totalProducts: this.state.filteredProducts.length,
        currentPage: this.state.paginate.currentPage
      })}
    `
  },
  initialize(products: IProduct[] = []) {
    this.state.products = []
    this.state.products.push(...products)
    this.state.filteredProducts.push(...products)
    this.state.mappedProducts = Products(this.state.products)
    this.state.categories = this.state.mappedProducts.getCategoryList()
    this.updateUI()
  },
  paginate(filteredProducts: IProduct[] = []) {
    const { currentPage, productsPerPage } = this.state.paginate
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const products = filteredProducts.length === 0 ? this.state.products : filteredProducts
    this.state.paginatedProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  },
  handlePaginate(e: Event) {
    e.preventDefault()
    // change Current Page
    this.state.paginate.currentPage = Number((e.target as HTMLElement).innerText)
    
    this.updateUI()
  },
  handleCategories(e: Event) {
    const category = (e.target as HTMLElement).textContent ?? 'invalid'
    this.updateUI(this.state.mappedProducts.getProductsByCategory(category))
  },
  handleSelectChange(e: Event) {
     const { value } = e.target as HTMLSelectElement
     const filteredProducts = this.state.mappedProducts.sort(this.state.filteredProducts, value)
     this.state.selectedValue = value
     this.updateUI(filteredProducts)
  },
  updateUI(filteredProducts: IProduct[] = []) {
    this.state.filteredProducts = filteredProducts.length === 0 ? this.state.products : filteredProducts
    this.paginate(filteredProducts)
    document.querySelector('#content')!.innerHTML = this.template()

    // add event to pagination links
    document.querySelector('.pagination')!.addEventListener('click', this.handlePaginate.bind(this))

    // add event to categories choice
    document.querySelectorAll('.laptops-filter__aside-category')!.forEach(catDOM => {
      catDOM.addEventListener('click', this.handleCategories.bind(this))
    })

    // add event to selects filter
    document.querySelector('.laptops-filter__select')?.addEventListener('change', this.handleSelectChange.bind(this))
  }
}
