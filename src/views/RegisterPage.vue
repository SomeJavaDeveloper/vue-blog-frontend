<template>
  <h1>It's a register page!</h1>
  <form>
    <form @submit.prevent="handleForm">
      <label>Username</label>
      <input type="text" v-model="username" @keyup="validateName" name="name"/>
      <br/>
      <label>Password</label>
      <input type="password" v-model="password" @keyup="validatePass" name="password"/>
      <br/>

      <button>Register user</button>
    </form>
  </form>
</template>

<script>
export default {
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
      fetch("/api/user", {
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
            location.href = '/login'
            this.username = ''
            this.password = ''
          })
          .catch(error => {
            //todo error processing after fetching BAD_CREDENTIALS response (look java MainController class)
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
