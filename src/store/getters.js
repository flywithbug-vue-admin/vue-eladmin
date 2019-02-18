
const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  simpleAppList: state => state.app.simpleList,
  token: state => state.user.token,
  userId: state => state.user.userId,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  createTime: state => state.user.createTime,
  status: state => state.user.status,
  roles: state => state.user.roles,
  email: state => state.user.email,
  errorLogs: state => state.errorLog.logs,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}

export default getters

