import { productItem } from "../views/productItem.js";

export class UI {
  
  displayProducts(productListDOM, products) {
    products.forEach(product => productListDOM.appendChild(productItem(product)))
  }

}
