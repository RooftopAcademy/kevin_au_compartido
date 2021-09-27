export interface IHeader {
  state : {
    cartBadge: number
  }
  template: () => string
  initialize: () => void
  setCartCount: (arg0: number) => void
  updateCartBadgeUI: () => void
  showCart: () => void
  hideCart: () => void
}
