import Cookies from 'js-cookie'

const TokenKey = 'Authorization'
const UUIDKey = 'UUID'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 7 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUUID() {
  let uuid = localStorage.getItem(UUIDKey)
  if (!uuid) {
    uuid = guid()
    localStorage.setItem(UUIDKey, uuid)
  }
  return uuid
}

function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

