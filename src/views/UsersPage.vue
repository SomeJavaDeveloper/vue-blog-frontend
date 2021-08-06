<template>

  <input v-model="inputName" @change="updateList"/>
  <p>Users</p>
  <div v-for="user in users" :key="user.id">

    <a @click="deleteUser(user.id)" href="#">
      Delete
    </a>
    <p>{{ user.username }}</p>
    <br>
  </div>
</template>

<script>

export default {
  name: "UsersPage",
  data() {
    return {
      users: [],
      inputName: ''
    }
  },
  mounted() {
    fetch("/api/users-except-current")
    .then(response => response.json())
    .then(data => {
      this.users = data
    })
    .catch(error => {
      console.log('users getting', error)
    })
  },
  methods: {
    updateList() {
      fetch("/api/users-except-current/" + this.inputName)
      .then(response => response.json())
      .then(data => {
        this.users = data
      })
      .catch(error => {
        console.log('users list updating', error)
      })
    },
    deleteUser(id) {
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

      fetch("/api/users/" + id, {
        method: 'DELETE',
        headers: {
          'X-XSRF-TOKEN': csrfToken
        }
      })
      .then(response => response.text())
      .then(response => {
        console.log('Successful delete', response)
      })
      .catch(error => {
        console.log('Error while deleting', error)
      })
    }
  }
}
</script>

<style scoped>

</style>
