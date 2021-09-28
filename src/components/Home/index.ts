import { path } from '../../constants/paths'

export const Home = {
  template() {
    return `
    <section class="home">
      <div class="home__container">
        <div class="home__img">
          <img src="assets/img/alienware.png" alt="Alienware m15" />
        </div>

        <div class="home__data">
          <h1 class="home__title">Gaming Laptops</h1>
          <p class="home__description">
            The new Alienware m15 Ryzen Edition laptop features AMD Ryzen 5000 series CPU and NVIDIA GeForce RTX 30-series graphics.
          </p>
          <a id="js-button-shop-now" href="${path.PRODUCTS}" class="button">Shop Now</a>
        </div>
      </div>
    </section>
  `
  },
  initialize() {
    document.querySelector('#content')!.innerHTML = this.template()
  },
}

// updateCart(callback: any) {
//   document.getElementById('js-button-shop-now')?.addEventListener('click', function(){
//     callback()
//   })
// }