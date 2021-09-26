import { IProduct } from "../../types/products";

export const Product = {
  template(product: IProduct) {
    return `
      <div class="laptop__content">
        <img src=${product.imgUrl} alt=${product.name} class="laptop__img" />
        <h3 class="laptop__title">${product.name}</h3>
        <span>${product.category}</span>
        <span>$${product.price}</span>
        <a href="#product-detail=${product.id}" data-laptop-id="${product.id}" class="button laptop__button">View More</a>
      </div>
    `
  },
  initialize(product: IProduct){
    return this.template(product)
  },
}