const footerTemplate = document.createElement('template');

footerTemplate.innerHTML = `
  <style>
    footer {
      background-color: var(--color-yellow);
      padding: 1em 0;
      text-align: center;
      position: absolute;
      width: 100%;
      bottom: 0;
    }
  </style>
  <footer>
    Kevin Au - Rooftop Academy
  </footer>
`;

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const fontAwesome = document.querySelector('link[href*="font-awesome"]');
    const shadowRoot = this.attachShadow({ mode: 'closed' });

    if (fontAwesome) {
      shadowRoot.appendChild(fontAwesome.cloneNode());
    }

    shadowRoot.appendChild(footerTemplate.content);
  }
}

customElements.define('footer-component', Footer);