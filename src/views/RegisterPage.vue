<template>
  <h1>It's a register page!</h1>
  <form>
    <form @submit.prevent="handleForm">
      <label>Username</label>
      <input type="text" v-model="username" @keyup="validateUsername" name="name"/>
      <p> {{ notValidNameMessage }}</p>
      <br/>
      <label>Password</label>
      <input type="password" v-model="password" @keyup="validatePassword" name="password"/>
      <p> {{ notValidPassMessage }}</p>
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
      password: '',
      isUsernameValid: false,
      isPasswordValid: false,
      notValidNameMessage: '',
      notValidPassMessage: ''
    }
  },
  methods: {
    handleForm() {
      if(this.isPasswordValid && this.isUsernameValid) {
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
            .then(response => {
              let status = response.status
              if (status === 208) {
                this.username = ''
                this.password = ''
                console.log('User already exists')
              }
              if (status === 200)
                this.$router.push({name: 'Login'})

            })
            .catch(error => {
              //something bad happened
              this.password = ''
              console.log(error)
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
      }
    },
    validateUsername() {
      if(/^[a-zA-Z0-9]{5,}$/.test(this.username)) {
        this.isUsernameValid = true;
        this.notValidNameMessage = '';
      } else {
        this.isUsernameValid = false;
        this.notValidNameMessage = 'Invalid username';
      }
    },
    validatePassword() {
      if(/^[a-zA-Z0-9]{5,}$/.test(this.password)) {
        this.isPasswordValid = true;
        this.notValidPassMessage = '';
      } else {
        this.isPasswordValid = false;
        this.notValidPassMessage = 'Invalid password';
      }
    }
  }
}
</script>
