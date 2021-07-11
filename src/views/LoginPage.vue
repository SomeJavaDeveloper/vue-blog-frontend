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
        password: this.password,
        creationDate: null,
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
          .then(response => response.text())
          .then(data => {
            console.log('Success:', data)
            location.href = '/'
          })
          .catch(error => {
            //todo error processing after fetching BAD_CREDENTIALS response (look java UserController class)
            this.password = ''
            console.log('Check the validity of username or password')
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
