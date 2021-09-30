export const Footer = {
  initialize($footer: string) {
    document.getElementById($footer)!.innerHTML = this.template()
  },
  template() {
    return `
      Kevin Au - Rooftop Academy
    `
  }
}
