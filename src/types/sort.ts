import { IProduct } from "./products"

export type sortParamsType = {
  id: -1 | 1
  name: -1 | 1
  category: -1 | 1
  price: -1 | 1
  [key: string]: -1 | 1
}

export interface IMappedProducts {
  get: () => IProduct[],
  getMappedProductsByKey: (params: sortParamsType) => Map<string, IProduct[]>
  getProductsByCategory: (arg: string) => IProduct[]
  getCategoryList: () => string[]
  sort: (arg0: IProduct[], arg1: string) => IProduct[]
}

export interface ISelectValues {
  [key: string] : any
}