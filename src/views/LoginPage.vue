<template>
  <h1>
    It's a login page!
  </h1>
  <form>
    <form @submit.prevent="handleForm">
      <label>Username</label>
      <input type="text" v-model="username" @keyup="validateName" name="name"/>
      <br/>
      <label>Password</label>
      <input type="password" v-model="password" @keyup="validatePass" name="password"/>
      <br/>

      <button>Login user</button>
    </form>
    <h2>Not yet registered? <router-link to="/register">Register</router-link></h2>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleForm() {
      const user = {
        username: this.username,
        password: this.password
      };
      function getCookie(name) {
        if (!document.cookie) {
          return null;
        }

        const xsrfCookies = document.cookie.split(';')
            .map(c => c.trim())
            .filter(c => c.startsWith(name + '='));

        if (xsrfCookies.length === 0) {
          return null;
        }
        return decodeURIComponent(xsrfCookies[0].split('=')[1]);
      }
      const csrfToken = getCookie('XSRF-TOKEN')
      console.log(csrfToken)
      // send json format of user to backend
      fetch("/api/login", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(user),
      })
          .then(response => {
            let status = response.status;
            if (status === 502) {
              console.log('Wrong login')
            }
            if (status === 400) {
              console.log('Wrong password')
            }
            if (status === 200)

              this.$router.push({name: 'Main'})
          })
          .catch(error => {
            // something bad happened during the request
            this.password = ''
            console.log(error)
          })
    },
    validateName() {
      //todo username validation
    },
    validatePass() {
      //todo password validation
    }
  }
}
</script>
