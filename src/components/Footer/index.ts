export const Footer = {
  initialize() {
    document.getElementById('footer')!.innerHTML = this.template()
  },
  template() {
    return `
      Kevin Au - Rooftop Academy
    `
  }
}
