export interface ILocalStorage {
  get: (arg0: string) => string | null
  set: (key: string, value: string) => void
  delete: (key: string) => void
}
