/* eslint-disable no-plusplus */
import './style.css'

export const Pagination = {
  state: {
    pageNumbers: [] as number[],
    currentPage: 1
  },
  template() {
    return `
      <nav class="pagination-container">
        <ul class="pagination">
          ${this.state.pageNumbers.map(number => (
            `
            <li class="page-item ${this.state.currentPage === number ? 'page-item-active' : ''}">
              <a class="page-link">
                ${number}
              </a>
            </li>
            `
          ))
          .join('')}
        </ul>
      </nav>
    `
  },
  initialize({ productsPerPage, totalProducts, currentPage } : {
    productsPerPage: number, totalProducts: number, currentPage: number
  }) {
    this.state.pageNumbers = []
    for(let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      this.state.pageNumbers.push(i)
    }
    this.state.currentPage = currentPage
    return this.template()
  },
  
}
