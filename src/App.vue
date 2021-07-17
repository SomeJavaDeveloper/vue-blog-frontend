<template>
  <header class="header">
    <div class="header-container">
      <div class="header-container__logo-and-search">
        <img src="https://storage.googleapis.com/vueblog-files-bucket/logo.png" alt=""/>
        <input type="search" maxlength="25" size="10" placeholder="search...">
        <button type="submit"><i class="fas fa-search"></i></button>
      </div>
      <div class="header-container__right-menu">
        <!--        ONLY FOR BEAUTY NOW -->
        <div class="friends">
          <i class="fas fa-user-friends"></i>
          <p>friends</p>
        </div>
        <div class="messages">
          <i class="fas fa-inbox"></i>
          <p>messages</p>
        </div>
        <div class="notifications">
          <i class="fas fa-bell"></i>
          <p>notifications</p>
        </div>
        <!--        ONLY FOR BEAUTY NOW -->
        <router-link to="/" class="home">
          <i class="fas fa-home"></i>
          <p>home</p>
        </router-link>
        <router-link v-if="!profile" to="login" class="home">
          <i class="fas fa-door-closed"></i>
          <p>Login</p>
        </router-link>
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

    }
  },
  methods: {

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

<style>
</style>
