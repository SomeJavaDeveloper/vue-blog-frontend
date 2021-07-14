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
      // send json format of user to backend
      fetch("/api/login", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
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
            // eslint-disable-next-line no-unused-vars
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
