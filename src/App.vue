<template>
  <header class="header">
    <div class="header-container">
      <div class="header-container__logo-and-search">
        <a href="/">
          <img src="https://storage.googleapis.com/vueblog-files-bucket/logo.png" alt=""/>
        </a>
        <input type="search" maxlength="25" v-model="toFindText" size="10" placeholder="search..."/>
        <button @click="find"><i class="fas fa-search"></i></button>
        <a style="font-size: 16pt; margin-left: 10px">Find By Tag</a>
        <input style="width: 40px" v-model="byTag" placeholder="Find by tags" type="checkbox"/>
      </div>
      <div class="header-container__right-menu">
        <!--        ONLY FOR BEAUTY NOW -->
<!--        ///////////////-->
        <div class="messages">
          <router-link to="/users" class="users">
            <i class="fas fa-users"></i>
            <p>Users</p>
          </router-link>
        </div>
<!--        <router-link to="/subscriptions" class="subscriptions">-->
<!--          <i class="fas fa-user-friends"></i>-->
<!--          <p>subscriptions</p>-->
<!--        </router-link>-->
        <div class="messages">
          <i class="fas fa-inbox"></i>
          <p>messages</p>
        </div>
        <div class="notifications">
          <i class="fas fa-bell"></i>
          <p>notifications</p>
        </div>
        <router-link v-if="!profile" to="/login" class="home">
          <i class="fas fa-door-closed"></i>
          <p>Login</p>
        </router-link>
        <div @click="logout" v-else class="home">
          <i class="fas fa-door-open"></i>
          <p>Logout</p>
        </div>
      </div>

    </div>
  </header>

  <router-view/>

<!--  <div>-->
<!--    <h2 class="block" style="text-align: center">-->
<!--      <router-link to="/user">Profile</router-link>-->
<!--    </h2>-->
<!--    <router-link to="/">Main page</router-link>-->
<!--  </div>-->
</template>

<script>
import MainPage from "./views/MainPage";

export default {
  name: 'App',
  // eslint-disable-next-line vue/no-unused-components
  components: {MainPage},
  data() {
    return {
      pageNumber: 0
    }
  },
  computed: {
    profile: {
      get() {
        return this.$store.state.userProf
      },
      set(profile) {
        this.$store.commit('updateProf', profile)
      }
    },
    byTag: {
      get() {
        return this.$store.state.byTag
      },
      set(byTag) {
        this.$store.state.byTag = byTag
      }
    },
    toFindText: {
      get() {
        return this.$store.state.toFindText
      },
      set(toFindText) {
        this.$store.state.toFindText = toFindText
      }
    }
  },
  methods: {
    find() {
      fetch("/api/message?filter=" + (this.toFindText ? this.toFindText : "") + "&bytag=" + this.byTag + "&page=" + this.pageNumber)
          .then(response => response.json())
          .then(data => {
            if (this.pageNumber === 0)
              this.$store.state.messages = data
            else
              this.$store.state.messages = this.$store.state.messages.concat(data.filter(item =>
                !JSON.stringify(this.$store.state.messages).includes(JSON.stringify(item))
              ))
            this.pageNumber++
          })
          .catch(error => {
            // something bad happened during the request
            console.log(error)
          })
    },
    logout() {
      fetch("/api/logout", {
        method: 'GET',
        mode: 'cors',
        //не нужно
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
          .then(response => response.json())
          .then(data => {
            console.log('data', data)
          })
          .catch(error => {
            console.log('logout', error)
          })
      location.href = '/'
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
