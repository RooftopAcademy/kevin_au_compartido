import { IProduct } from "./products";

export interface ICart {
  state : {
    products: IProduct[]
  }
  template: () => string
  initialize: (arg0: string) => void
  addProduct: (arg0: IProduct) => void
  updateCartUIOnAdd: (product: IProduct, isNewProduct: boolean) => void
  hideCart: () => void
  clearCart: () => void
  removeItem: (arg: string | undefined) => void
  updateTotalAmount: () => void
  getQuantityOfProductsInCart: () => number
  incrementProductQuantity: (id: string, target: HTMLElement) => void
  decrementProductQuantity: (id: string, target: HTMLElement) => void
}

export interface ICartItem {
  state: {
    product: null | IProduct
  }
  template: () => HTMLDivElement
  initialize: (arg0: IProduct) => HTMLDivElement
}
