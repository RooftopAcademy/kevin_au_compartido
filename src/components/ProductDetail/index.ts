import { IProduct, IProductDetail } from "../../types/products";

export const ProductDetail: IProductDetail = {
  state : {
    product: null,
  },
  template() {
    const product = this.state.product
    const section = document.createElement('section')
    section.classList.add('laptop__details')

    if(!product) {
      section.innerHTML = 'Producto invalido'
      return;
    }

    section.innerHTML = `
    <div class="laptop__image">
      <img src=${product.imgUrl} alt=${product.name} />
    </div>
    <div class="laptop__description">
      <h2>${product.name}</h2>
      <p class="laptop__description-item">
        <i class="uil uil-processor icon"></i>Processor AMD Ryzen™ 7 5800H (8-Core, 20MB Total Cache, up to 4.4 GHz
        Max Boost Clock)
      </p>
      <p class="laptop__description-item"><i class="uil uil-processor icon"></i>Laptop Windows 10 Home English</p>
      <p class="laptop__description-item"><i class="uil uil-sim-card icon"></i>Videocard NVIDIA® GeForce RTX™ 3070 8GB GDDR6</p>
      <p class="laptop__description-item"><i class="uil uil-sim-card icon"></i>Memory 16GB DDR4 3200MHz</p>
      <p class="laptop__description-item"><i class="uil uil-sim-card icon"></i>Harddrive 1TB PCIe M.2 SSD</p>
      <a href="#" class="button js-add-cart add-cart" data-laptop-id="${product.id}">Add to Cart ($${product.price})</a>
    </div>
    `
    return section
  },
  initialize(product: IProduct[] = []){
    const $content = document.getElementById('content')
    if(product.length > 0 ) {
      this.state.product = product[0]
      const $laptopDetail = document.querySelector('.laptop__details')
      $content!.contains($laptopDetail) && $laptopDetail?.remove()
      $content!.appendChild(this.template() as HTMLElement)

      // Setear Evento
      
    } else {
      $content!.innerHTML = '<section class="laptop__details">No se ha encontrado el producto</section>'
    }
  },
}