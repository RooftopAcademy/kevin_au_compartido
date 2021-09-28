import { ICart } from "./cart";
import { IHeader } from "./header";
import { IProduct } from "./products";

export interface IAddProductToCartEvent {
  target: HTMLElement
  products: IProduct[]
  Cart: ICart
  Header: IHeader
}

export interface IClearCartEvent {
  Cart: ICart
  Header: IHeader
}

export interface IRemoveItemInCartEvent {
  e: Event
  Cart: ICart
  Header: IHeader
}
