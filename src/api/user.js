import client from '../utils/fetch'

export function login(username, password) {
  const data = {
    username,
    password
  }
  return client({
    url: '/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return client({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return client({
    url: '/logout',
    method: 'post'
  })
}
export function tree(query) {
  return client({
    url: '/user/tree',
    method: 'get',
    params: query
  })
}

export function queryList(query) {
  return client({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function info(id) {
  const data = {
    id
  }
  return client({
    url: '/user/info',
    method: 'get',
    data
  })
}
export function add(data) {
  if (data.enabled === 'true') {
    data.enabled = true
  } else {
    data.enabled = false
  }
  return client({
    url: 'user',
    method: 'post',
    data
  })
}

export function del(id) {
  const data = {
    id
  }
  return client({
    url: '/user',
    method: 'delete',
    data
  })
}

export function edit(data) {
  console.log('edit:', data)
  if (data.enabled === 'true') {
    data.enabled = true
  } else {
    data.enabled = false
  }
  return client({
    url: '/user',
    method: 'put',
    data
  })
}

export function validPassword(password) {
  return client({
    url: '/user/password/valid?password=' + password,
    method: 'get'
  })
}

export function updatePassword(password, old_password) {
  const data = {
    password,
    old_password
  }
  return client({
    url: '/user/password',
    method: 'put',
    data
  })
}

export function updateEmail(code, mail, password) {
  const data = {
    mail,
    code,
    password
  }
  return client({
    url: '/user/mail',
    method: 'put',
    data
  })
}

export function sendMailVerifyCode(mail) {
  const data = {
    mail
  }
  return client({
    url: '/mail/verify',
    method: 'post',
    data
  })
}

export function updateAvatar(avatar) {
  const data = {
    avatar
  }
  return client({
    url: '/user/avatar',
    method: 'put',
    data
  })
}

