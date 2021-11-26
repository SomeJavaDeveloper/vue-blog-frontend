<template>
  <h1 class="form-user-label-info">
    Login
  </h1>
  <form>
    <form @submit.prevent="handleForm">
      <p class="form-user-data-alert">{{notValidNameMessage}}</p>
      <br>
      <input class="form-user-data-input" type="text" placeholder="Username"
             v-model="username" @keyup="validateName" name="name"/>
      <br/>
      <p class="form-user-data-alert">{{notValidPassMessage}}</p>
      <br>
      <input class="form-user-data-input" type="password" placeholder="Password"
             v-model="password" @keyup="validatePass" name="password"/>
      <br/>

      <button class="user-form-button">Login user</button>
    </form>
    <h2 style="margin-left: 36%; margin-top: 15px">Not yet registered? <router-link to="/register">Register</router-link></h2>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      notValidNameMessage: 'ᅠ ᅠ',
      notValidPassMessage: 'ᅠ ᅠ',
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
              this.notValidNameMessage = 'Wrong login'
              this.notValidPassMessage = 'ᅠ ᅠ'
              console.log('Wrong login')
            }
            if (status === 400) {
              this.notValidPassMessage = 'Wrong password'
              this.notValidNameMessage = 'ᅠ ᅠ'
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
    }
  }
}
</script>
