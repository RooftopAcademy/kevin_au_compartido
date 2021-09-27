export interface IProduct {
  id: string
  imgUrl: string
  name: string
  category: string
  price: string
  amount?: number
}

export interface IProductDetail {
  state: {
    product: IProduct | null
  }
  template: () => HTMLElement | undefined
  initialize: (arg0: IProduct[]) => void
}
