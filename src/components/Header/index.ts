import { IHeader } from '../../types/header'

export const Header: IHeader = {
  state : {
    cartBadge: 0
  },
  template() {
    return `
      <nav>
        <a class="nav__logo" href="#home">Alienware</a>
        
        <div class="nav__menu" id="nav-menu">
          <ul class="nav__list">
            <li class="nav__item">
                <a href="#home" class="nav__link">Home</a>
            </li>
            <li class="nav__item">
                <a href="#products" class="nav__link">Products</a>
            </li>
            <li class="nav__item">
                <a href="#contact" class="nav__link">Contact us</a>
            </li>

            <i class="uil uil-toggle-off change-theme" id="theme-button"></i>
          </ul>
        </div>

        <div class="nav__cart" id="nav-cart">
          <i class="uil uil-shopping-cart-alt"></i>
          <span id="cart-badge" class="cart__badge">${this.state.cartBadge}</span>
        </div>

        <div class="nav__toggle" id="js-nav-toggle">
          <i class="uil uil-apps" id="js-nav-toggle"></i>
        </div>
      </nav>
      `
  },
  initialize($header) {
    document.getElementById($header)!.innerHTML = this.template()

    document.getElementById('js-nav-toggle')!.addEventListener('click', () => {
      document.getElementById('nav-menu')!.classList.toggle('show-menu')
    })
    
    document.getElementById('nav-cart')!
      .addEventListener('click', 
        () => {
          const $cartDOM = document.querySelector('.cart')
          $cartDOM!.classList.contains('showCart')
            ? this.hideCart()
            : this.showCart()
        }
      )
  },
  setCartCount(count: number) {
    this.state.cartBadge = count
    this.updateCartBadgeUI()
  },
  updateCartBadgeUI() {
    document.getElementById('cart-badge')!.textContent = this.state.cartBadge.toString()
  },
  showCart() {
    const $cartDOM = document.querySelector('.cart')
    const $cartOverlay = document.querySelector('.cart-overlay')
    $cartOverlay!.classList.add('transparentBcg')
    $cartDOM!.classList.add('showCart')
  },
  hideCart() {
    const $cartDOM = document.querySelector('.cart')
    const $cartOverlay = document.querySelector('.cart-overlay')
    $cartOverlay!.classList.remove('transparentBcg')
    $cartDOM!.classList.remove('showCart')
  },
  incrementBadgeByOne() {
    this.state.cartBadge++
    this.updateCartBadgeUI()
  },
  decrementBadgeByOne() {
    if(this.state.cartBadge > 0) {
      this.state.cartBadge--
      this.updateCartBadgeUI()
    }  
  }
}
