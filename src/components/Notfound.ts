export const Notfound = {
  initialize() {
    document.getElementById('content')!.innerHTML = this.template()
  },
  template() {
    return `
      <h1>404 - Not Found</h1>
    `
  }
}
