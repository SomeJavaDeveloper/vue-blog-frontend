<template>
  <div>
    <h2 class="block" style="text-align: center">
      <router-link to="/user">Profile</router-link>
    </h2>
    <router-link to="/">Main page</router-link>
    <h2 class="block" style="text-align: right">
      <router-link to="/login">Log in</router-link>
      <button @click="logout">Logout</button>
    </h2>
  </div>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  methods: {
    //sending request for logout to backend
    logout() {
      fetch("/api/logout", {
        method: 'GET',
        mode: 'no-cors',
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
