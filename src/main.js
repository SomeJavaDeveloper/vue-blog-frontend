import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

const store = createStore({
  state() {
    return {
      userProf: null,
      messages: []
    }
  },
  mutations: {
    updateProf(state, profile) {
      state.userProf = profile
    },
    updateMessages(state, messages) {
      state.messages = messages
    }
  }
})

createApp(App).use(router).use(store).mount('#app')
