export default {
  route: {
    versionManager: '版本管理',
    index: '首页',
    appManager: 'APP管理',
    metadata: '元数据',
    userManager: '人员管理',
    organizationStruct: '组织架构',
    systemManager: '系统管理',
    permissionManager: '权限管理',
    roleManager: '角色管理',
    menuManager: '菜单管理',
    user: '人员',
    dashboard: '首页',
    guide: '引导页',
    icons: '图标'
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤',
    size: '布局大小',
    personal: '个人中心'
  },
  actions: {
    action: '操 作',
    search: '搜 索',
    add: '添 加',
    edit: '编 辑',
    delete: '删 除',
    cancel: '取 消',
    confirm: '确 定',
    export: '导出'
  },
  placeholder: {
    name: '请输入名字',
    alias: '请输入别名',
    bundle_id: '请输入应用包名,格式: com.xxx.xx',
    desc: '请输入描述内容',
    sup_dir: '请选择上级目录',
    permission: '请选择权限',
  },
  query: {
    model_query:"请输入Model关键字",
    app_name:"应用名"

  },
  application: {
    table_app_icon: '应用图标',
    table_app_icon_warning: '请上传应用图标'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  table: {
    title: '标题',
    type: '类型',
    id: '序号',
    date: '时间',
    status: '状态',
    icon: '图标',
    owner: '负责人',
    manager: '管理员',
    create_time: '创建时间',
    desc: '描述',
    name: '名称',
    alias: '别名',
    bundle: '包名',
    sup_dir: '上级目录',
    permission: '权限'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  appVersion: {
    versionN: '版本号',
    parentVN: '父版本号',
    parentVNPlaceholder: '父版本号(必须已存在）',
    platform: '平台',
    approvalTime: '立项时间',
    lockTime: '锁版时间',
    releaseTime: '发布时间',
    grayTime: '灰度时间',
    status: '状态',
    createTime: '添加时间'
  },
  selector: {
    placeholder: '请选择',
    preparing: '准备中',
    developing: '开发中',
    gray: '灰度',
    release: '已发布',
    workDone: 'Work done',
    changeStatus: '状态',
    develop: '开发',
    releasing: '发布',
    confirmChange: '切换状态到',
    confirmDelete: '确定要删除当前版本？'
  },
  system: {
    name: '名字',
    phone: '电话',
    title: '职位',
    status: '状态',
    note: '备注',
    avatar: '头像',
    email: '邮箱',
    username: '用户名',
    code: '代码',
    type: '类型',
    per_confirm_del: '确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！',
    role_confirm_del: '确定删除本条数据吗？'
  }

}
