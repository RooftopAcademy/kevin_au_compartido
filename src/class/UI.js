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

  updateCart(DOMref, value) {
    
  }
}
