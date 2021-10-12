export interface IProduct {
  id: string
  imgUrl: string
  name: string
  category: string
  price: string
  amount?: number
  [key: string]: string | number | undefined
}

export interface IProductDetail {
  state: {
    product: IProduct | null
  }
  template: () => HTMLElement | undefined
  initialize: (arg0: IProduct[]) => void
}
