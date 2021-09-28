import { IProduct } from "./products";

export interface ICart {
  state : {
    products: IProduct[]
  }
  template: () => string
  initialize: () => void
  addProduct: (arg0: IProduct) => void
  updateCartUIOnAdd: (product: IProduct, isNewProduct: boolean) => void
  hideCart: () => void
  clearCart: () => void
  removeItem: (arg: string | undefined) => void
  updateTotalAmount: () => void
  getQuantityOfProductsInCart: () => number
}

export interface ICartItem {
  state: {
    product: null | IProduct
  }
  template: () => HTMLDivElement
  initialize: (arg0: IProduct) => HTMLDivElement
}
