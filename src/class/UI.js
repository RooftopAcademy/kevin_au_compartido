import { productItem } from "../views/productItem.js";
import { productDetail } from "../views/productDetail.js";

export class UI {
  
  displayProducts(productListDOM, products) {
    products.forEach(product => productListDOM.appendChild(productItem(product)))
  }

  showProductDetail(DOMref, product) {
    DOMref.innerHTML = ""
    DOMref.appendChild(productDetail(product))
  }

  displayLoading(loaderDOM, state) {
    state 
      ? loaderDOM.classList.add("display") 
      : loaderDOM.classList.remove("display")
  }

  showDetails(productDetailDOM, productId, products) {
    const [product] = products.filter(p => p.id == productId)
    this.showProductDetail(productDetailDOM, product)
  }

  updateCart(DOMref, value) {
    
  }
}
