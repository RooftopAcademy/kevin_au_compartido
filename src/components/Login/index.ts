import { DOM } from '../../constants/domElements';
import { ILoginForm } from '../../types/form'

export const LoginForm: ILoginForm = {
  state: {
    email: '',
    password: ''
  },
  template() {
    return `
      <form id="${DOM.$loginForm}" class="form__login-container">
        <h5>Login</h5>

        <label class="form__login-label" for="email"><b>Email</b></label>
        <input 
          class="form__login-input"
          type="text"
          placeholder="Enter Email"
          name="email"
          autocomplete="off"
          value="${this.state.email}"
          required
        >

        <label class="form__login-label" for="password"><b>Password</b></label>
        <input 
          class="form__login-input"
          type="password"
          placeholder="Enter Password"
          name="password"
          value="${this.state.password}"
          autocomplete="off"
          required
        >

        <button type="submit" class="button">Login</button>
      </form>
    `
  },
  initialize() {
    const $loginContainer = document.getElementById(DOM.$loginContainer) as Element
    $loginContainer.innerHTML = this.template()

    // onSubmit
    const $loginForm = document.getElementById(DOM.$loginForm) as HTMLFormElement
    $loginForm.onsubmit = this.onSubmit.bind(this)

    // onInputChange
    const $emailInput = $loginForm.elements[0] as HTMLInputElement
    const $passwordInput = $loginForm.elements[1] as HTMLInputElement

    $emailInput.addEventListener('keyup', this.handleChange.bind(this))
    $passwordInput.addEventListener('keyup', this.handleChange.bind(this))
  },
  onSubmit(e) {
    e.preventDefault()
    console.log(this.state)
  },
  handleChange(e) {
    e.preventDefault()
    let key: 'password' | 'email' = (<HTMLInputElement>e.target).name as 'password' | 'email'
    let value = (<HTMLInputElement>e.target).value
    this.state[key] = value
  }
}
