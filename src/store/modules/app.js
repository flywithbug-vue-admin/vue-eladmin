
const app = {
  state: {
    sidebar: {
      opened: localStorage.getItem('sidebarStatus') === '0',
      withoutAnimation: false
    },
    device: 'desktop',
    language: localStorage.getItem('language') || 'zh',
    size: localStorage.getItem('size') || 'medium'
  },
  mutations: {
    TOGGLE_SIDEBAR(state) {
      if (state.sidebar.opened) {
        localStorage.setItem('sidebarStatus', '1')
      } else {
        localStorage.setItem('sidebarStatus', '0')
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR(state, withoutAnimation) {
      localStorage.setItem('sidebarStatus', '1')
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE(state, device) {
      state.device = device
    },
    SET_LANGUAGE(state, language) {
      state.language = language
      localStorage.setItem('language', language)
    },
    SET_SIZE(state, size) {
      state.size = size
      localStorage.setItem('size', size)
    }
  },
  actions: {
    toggleSideBar(context) {
      context.commit('TOGGLE_SIDEBAR')
    },
    closeSideBar(context, withoutAnimation) {
      context.commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice(context, device) {
      context.commit('TOGGLE_DEVICE', device)
    },
    setLanguage(context, language) {
      context.commit('SET_LANGUAGE', language)
    },
    setSize(context, size) {
      context.commit('SET_SIZE', size)
    }
  }
}

export default app
