export const Cart = {
  state: {
    products: [],
  },
  template() {
    return `
    <div class="cart">
      <span class="close-cart">
        <i class="uil uil-times"></i>
      </span>
      <h2>your cart</h2>
      <div class="cart-content">
        <!-- CART ITEM -->
        <!-- END OF CART ITEM -->
      </div>
      <div class="cart-footer">
        <h3>your total: $ <span class="cart-total">0</span></h3>
        <button class="clear-cart banner-btn">clear cart</button>
      </div>
    </div>
    `
  },
  initialize() {
    document.getElementById('cart-overlay')!.innerHTML = this.template()
  },
}