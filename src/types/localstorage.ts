export interface ILocalStorage {
  get: (arg0: string) => JSON | null
  set: (key: string, value: string) => void
  delete: (key: string) => void
}