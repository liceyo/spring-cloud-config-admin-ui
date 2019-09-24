
export function getStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function setStorage(key, data) {
  return localStorage.setItem(key, JSON.stringify(data))
}

export function removeStorage(key) {
  return JSON.parse(localStorage.removeItem(key))
}

export const STORAGE_ENVS = 'STORAGE_ENVS'
export const STORAGE_LABELS = 'STORAGE_LABELS'
