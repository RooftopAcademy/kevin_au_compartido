export interface IHeader {
  state : {
    cartBadge: number
  }
  template: () => string
  initialize: () => void
  incrementCartBadge: () => void
  updateCartBadgeUI: () => void
  showCart: () => void
  hideCart: () => void
}
