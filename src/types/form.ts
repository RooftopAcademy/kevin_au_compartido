export interface ILoginForm {
  state: {
    email: string
    password: string
  }
  template: () => string
  initialize: () => void
  onSubmit: (e: Event) => void
  handleChange: (e: Event) => void
}
