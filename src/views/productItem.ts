import { IProduct } from "../types/products"

export const productItem = (product: IProduct) => {
  const div = document.createElement('div')
  div.classList.add('laptop__content')
  div.innerHTML = `
      <img src=${product.imgUrl} alt=${product.name} class="laptop__img" />
      <h3 class="laptop__title">${product.name}</h3>
      <span>${product.category}</span>
      <span>$${product.price}</span>
      <a href="#detail__section" data-laptop-id="${product.id}" class="button laptop__button">View More</a>
  `
  return div
}
