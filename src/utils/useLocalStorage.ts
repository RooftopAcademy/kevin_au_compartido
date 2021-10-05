import { ILocalStorage } from '../types/localstorage';

const useLocalStorage: ILocalStorage = {
  get(key) {
    const value = window.localStorage.getItem(key);
    return value || null;
  },
  set(key, value) {
    window.localStorage.setItem(key, value);
  },
  delete(key) {
    window.localStorage.removeItem(key);
  },
};

export default useLocalStorage;
