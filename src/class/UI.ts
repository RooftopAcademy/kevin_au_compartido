import { productItem } from "../views/productItem";
import { productDetail } from "../views/productDetail";

import { IProduct } from "../types/products";

export class UI {
  
  displayProducts(productListDOM: Element, products: IProduct[]) {
    products.forEach(product => productListDOM.appendChild(productItem(product)))
  }

  showProductDetail(DOMref: Element, product: IProduct) {
    DOMref.innerHTML = ""
    DOMref.appendChild(productDetail(product))
  }

  displayLoading(loaderDOM: Element, state: boolean) {
    state 
      ? loaderDOM.classList.add("display") 
      : loaderDOM.classList.remove("display")
  }

  showDetails(productDetailDOM: Element, productId: string, products: IProduct[]) {
    const [product] = products.filter(p => p.id == productId)
    this.showProductDetail(productDetailDOM, product)
  }

  updateCart(DOMref: Element, value: IProduct) {
    
  }
}
