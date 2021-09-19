const headerTemplate = document.createElement("template")

headerTemplate.innerHTML = `
  <style>
    header {
      width: 100%;
      background-color: var(--body-color);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
    }

    nav {
      height: 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 1px 4px rgba(0, 0, 0, .1);
    }

    .nav__logo {
      font-weight: var(--font-bold);
      text-decoration: none;
    }

    @media screen and (max-width: 767px){
      .nav__menu{
        position: fixed;
        background-color: var(--color-white);
        box-shadow: 0 0 4px rgba(0,0,0,.1);
        padding: 1rem 0;
        width: 90%;
        top: -100%;
        left: 0;
        right: 0;
        margin: 0 auto;
        border-radius: 2rem;
        transition: .4s;
      }
    }

    .nav__list {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 1.5rem;
      list-style: none;
    }

    @media screen and (min-width: 767px) {
      .nav__list {
        flex-direction: row;
        column-gap: 2.5rem;
      }

      .nav__toggle {
        display: none;
      }
    }
    
    .nav__link, .nav__logo, .nav__toggle {
      font-weight: var(--font-bold);
      color: var(--text-color);
    }

    .nav__link {
      text-decoration: none;
    }

    .nav__link:hover {
      border-bottom: 1px solid black;
    }

    .nav__toggle {
      font-size: 1.3rem;
      cursor: pointer;
    }

    .show-menu {
      top: calc(var(--header-height) + .5rem);
    }

    .change-theme {
      position: absolute;
      right: 1.5rem;
      top: 2.2rem;
      color: var(--text-color);
      font-size: 1.8rem;
      cursor: pointer;
    }
  </style>

  <header>
    <nav>
      <a class="nav__logo" href="/">Alienware</a>
      
      <div class="nav__menu" id="nav-menu">
        <ul class="nav__list">
          <li class="nav__item">
              <a href="#home" class="nav__link">Home</a>
          </li>
          <li class="nav__item">
              <a href="#about" class="nav__link">Catalog</a>
          </li>
          <li class="nav__item">
              <a href="#services" class="nav__link">About Us</a>
          </li>
          <li class="nav__item">
              <a href="#contact" class="nav__link">Contact us</a>
          </li>

          <i class="uil uil-toggle-off change-theme" id="theme-button"></i>
        </ul>
      </div>

      <div class="nav__toggle" id="nav-toggle">
        <i class="uil uil-apps"></i>
      </div>
    </nav>
  </header>
`

class Header extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" })

    // ============ ADD UNICONS  =================
    const iconscout = document.querySelector('link[href*="unicons"]');
    if (iconscout) {
      shadowRoot.appendChild(iconscout.cloneNode());
    }

    // =========== RENDER CONTENT =========
    shadowRoot.appendChild(headerTemplate.content)

    // ============ TOOGLE MENU ============
    const toggle = shadowRoot.getElementById('nav-toggle')
    const navMenu = shadowRoot.getElementById('nav-menu')    

    toggle.addEventListener('click', () => navMenu.classList.toggle('show-menu'))

    // ============ REMOVE MENU ON NAVLINK CLICK ============
    const navLink = shadowRoot.querySelectorAll('.nav__link')
    navLink.forEach(el => el.addEventListener('click', () => navMenu.classList.remove('show-menu')))
  }
}

customElements.define("header-component", Header)
