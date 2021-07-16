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

      if(this.isPasswordValid && this.isUsernameValid) {
        const user = {
          username: this.username,
          password: this.password,
          creationDate: null,
        };
        const csrfToken = getCookie('XSRF-TOKEN')
        console.log(csrfToken)
        // send json format of user to backend
        fetch("/api/user", {
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
