import { DOM } from '../../constants/domElements'
import { ILoginForm } from '../../types/form'
import { signup, getCurrentUser } from '../../app'

import './style.css'

export const LoginForm: ILoginForm = {
  state: {
    user : {
      email: '',
      password: '',
      name: ''
    },
    isRegisterMode: false
  },
  loginInputs() {
    return `
      <label class="form__login-label" for="email"><b>Email</b></label>
      <input 
        class="form__login-input"
        type="text"
        placeholder="Enter Email"
        name="email"
        autocomplete="off"
        value="${this.state.user.email}"
        required
      >

      <label class="form__login-label" for="password"><b>Password</b></label>
      <input 
        class="form__login-input"
        type="password"
        placeholder="Enter Password"
        name="password"
        value="${this.state.user.password}"
        autocomplete="off"
        required
      >

      <span id="form__resigster-span" class="form__register-span">Eres Nuevo? Registrate</span>
    `
  },
  registerInputs() {
    return `
      <label class="form__login-label" for="name"><b>Name</b></label>
      <input 
        class="form__login-input"
        type="text"
        placeholder="Name"
        name="name"
        autocomplete="off"
        value="${this.state.user.name}"
        required
      >

      <label class="form__login-label" for="email"><b>Email</b></label>
      <input 
        class="form__login-input"
        type="text"
        placeholder="Enter Email"
        name="email"
        autocomplete="off"
        value="${this.state.user.email}"
        required
      >

      <label class="form__login-label" for="password"><b>Password</b></label>
      <input 
        class="form__login-input"
        type="password"
        placeholder="Enter Password"
        name="password"
        value="${this.state.user.password}"
        autocomplete="off"
        required
      >

      <span id="form__resigster-span" class="form__register-span">Ya tiene cuenta? Inicia Sesion</span>
    `
  },
  renderForm() {
    return `
      <form id="${DOM.$loginForm}" class="form__login-container">
        <h5>${this.state.isRegisterMode ? 'Register' : 'Login'}</h5>

        ${this.state.isRegisterMode ? this.registerInputs() : this.loginInputs()}

        <button type="submit" class="button">${this.state.isRegisterMode ? 'Register' : 'Login'}</button>
      </form>
    `
  },
  initialize() {
    this.updateFormUI()  
  },
  setRegisterMode() {
    this.state.isRegisterMode = !this.state.isRegisterMode
    this.updateFormUI()
  },
  updateFormUI() {
    const $loginContainer = document.getElementById(DOM.$loginContainer) as Element
    // This remove all listener in the form UI
    $loginContainer.innerHTML = this.renderForm()

    this.addFormListeners()
  },
  addFormListeners() {
    // onSubmit
    const $loginForm = document.getElementById(DOM.$loginForm) as HTMLFormElement
    $loginForm.onsubmit = this.onSubmit.bind(this)

    // onInputChange
    Array.from($loginForm.elements).forEach((e: Node) => {
      if ( e.nodeName === 'INPUT' ) {
        if( (e as HTMLInputElement).type === 'text' ||  (e as HTMLInputElement).type === 'password') {
          e.addEventListener('keyup', this.handleChange.bind(this))
        }
      }
    })

    // Switch Register or Login
    const $registerSpan = document.getElementById('form__resigster-span') as HTMLElement
    $registerSpan.addEventListener('click', this.setRegisterMode.bind(this))
  },
  async onSubmit(e) {
    e.preventDefault()
    // useLocalStorage.set('user', this.state)
    // Header.setUser(this.state.user)
    if ( this.state.isRegisterMode ) {
      await signup(this.state.user)
      console.log(getCurrentUser())
    } else {
      console.log({email: this.state.user.email, password: this.state.user.password})
    }
  },
  handleChange(e) {
    e.preventDefault()
    const key: 'password' | 'email' | 'name' = (<HTMLInputElement>e.target).name as 'password' | 'email' | 'name'
    const { value } = <HTMLInputElement>e.target
    this.state.user[key] = value
  }
}
