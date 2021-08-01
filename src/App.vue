<template>
  <header class="header">
    <div class="header-container">
      <div class="header-container__logo-and-search">
        <router-link to="/">
          <img src="https://storage.googleapis.com/vueblog-files-bucket/logo.png" alt=""/>
        </router-link>
        <input type="search" maxlength="25" v-model="toFindText" size="10" placeholder="search..."/>
        <button @click="find"><i class="fas fa-search"></i></button>
        <a style="font-size: 16pt; margin-left: 10px">Find By Tag</a>
        <input style="width: 40px" v-model="byTag" placeholder="Find by tags" type="checkbox"/>
      </div>
      <div class="header-container__right-menu">
        <!--        ONLY FOR BEAUTY NOW -->
<!--        ///////////////-->
        <router-link to="/users" class="users">
          <i class="fas fa-users"></i>
          <p>Users</p>
        </router-link>
        <router-link to="/subscriptions" class="subscriptions">
          <i class="fas fa-user-friends"></i>
          <p>subscriptions</p>
        </router-link>
        <div class="messages">
          <i class="fas fa-inbox"></i>
          <p>messages</p>
        </div>
        <div class="notifications">
          <i class="fas fa-bell"></i>
          <p>notifications</p>
        </div>
        <router-link v-if="!profile" to="login" class="home">
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
export default {
  name: 'App',
  data() {
    return {
      toFindText: '',
      byTag: false
    }
  },
  methods: {
    find() {
      fetch("/api/message?filter=" + this.toFindText + "&bytag=" + this.byTag)
          .then(response => response.json())
          .then(data => {
            this.$store.state.messages = data
            this.toFindText = ''
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
  },
  computed: {
    profile: {
      get() {
        return this.$store.state.userProf
      },
      set(profile) {
        this.$store.commit('updateProf', profile)
      }
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
