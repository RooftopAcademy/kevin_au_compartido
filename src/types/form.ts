import { IHeader } from "./header";

export interface ILoginForm {
  state: {
    user: {
      email: string
      password: string
      username: string
    },
    isRegisterMode: boolean
  }
  renderForm: () => string
  loginInputs: () => string
  registerInputs: () => string
  initialize: (arg0?: IHeader) => void
  onSubmit: (e: Event) => void
  handleChange: (e: Event) => void
  setRegisterMode: () => void
  addFormListeners: () => void
  updateFormUI: () => void
}
