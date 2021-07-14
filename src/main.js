import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

const store = createStore({
  state() {
    return {
      userProf: null
    }
  },
  mutations: {
    updateProf(state, profile) {
      state.userProf = profile
    }
  }
})

createApp(App).use(router).use(store).mount('#app')
