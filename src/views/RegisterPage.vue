<template>
  <h1 class="form-user-label-info">Register</h1>
  <form>
    <form @submit.prevent="handleForm">
      <p class="form-user-data-alert"> {{ notValidNameMessage }}</p>
      <br/>
      <input class="form-user-data-input" type="text" placeholder="Username" v-model="username" @keyup="validateUsername" name="name"/>
      <p class="form-user-data-alert"> {{ notValidPassMessage }}</p>
      <br>
      <input class="form-user-data-input" type="password" placeholder="Password" v-model="password" @keyup="validatePassword" name="password"/>
      <br/>
      <input style="margin-left: 36%; margin-bottom: 10px" type="file" @change="onFileChange" ref="uploadImage" multiple accept="image/*,video/*">
      <br/>
      <button class="user-form-button">Register user</button>
    </form>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: '',
      password: '',
      isUsernameValid: false,
      isPasswordValid: false,
      notValidNameMessage: 'ᅠ ',
      notValidPassMessage: 'ᅠ ',
      url: null
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
          photoLink: this.$refs.uploadImage.files[0] ? this.$refs.uploadImage.files[0].name : ''
        };

        const json = JSON.stringify(user);
        const blobJson = new Blob([json], {
          type: 'application/json'
        });

        const file = this.$refs.uploadImage.files[0];
        const blobData = new Blob([file], {
          type: 'multipart/form-data'
        });
        const data = new FormData();
        data.append("user", blobJson);
        if (file)
          data.append("file", blobData);
        else
          data.append("file", new Blob([], {
            type: 'multipart/form-data'
          }));

        const csrfToken = getCookie('XSRF-TOKEN')
        console.log(csrfToken)
        // send json format of user to backend

        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

        axios({
          method: 'post',
          mode: 'cors',
          url: 'http://localhost:3000/api/user',
          data: data,
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

        // fetch("/api/user", {
        //   method: 'POST',
        //   mode: 'cors',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'X-XSRF-TOKEN': csrfToken
        //   },
        //   body: JSON.stringify(user),
        // })
      }
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    validateUsername() {
      if(/^[a-zA-Z0-9]{5,18}$/.test(this.username)) {
        this.isUsernameValid = true;
        this.notValidNameMessage = 'ᅠ ';
      } else {
        this.isUsernameValid = false;
        this.notValidNameMessage = 'Invalid username';
      }
    },
    validatePassword() {
      if(/^[a-zA-Z0-9]{5,40}$/.test(this.password)) {
        this.isPasswordValid = true;
        this.notValidPassMessage = 'ᅠ ';
      } else {
        this.isPasswordValid = false;
        this.notValidPassMessage = 'Invalid password';
      }
    }
  }
}
</script>
