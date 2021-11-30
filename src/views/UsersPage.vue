<template>

  <input v-model="inputName" @keyup="updateList" class="username-input"/>


  <div v-for="user in users" :key="user.id" class="user-container__user-box">
    <div class="post_name">
      <div class="post_logo">
        <picture>
          <img :src="user.photoLink" alt=""></picture>
      </div>
      <div>
<!--        <router-link v-if="user == profile.id"-->
<!--          :to="{ name: 'Profile', params: {-->
<!--            username: profile.username-->
<!--          }}">-->
<!--          <h1>-->
<!--            {{ profile.username }}-->
<!--          </h1>-->
<!--        </router-link>-->
        <router-link :to="{ name: 'Profile', params: {
            username: user.username
          }}">
          <h1>{{ user.username }}</h1>
        </router-link>
      </div>
    </div>
  </div>
<!--  <div v-for="user in users" :key="user.id">-->

<!--    <a @click="deleteUser(user.id)" href="#">-->
<!--      Delete-->
<!--    </a>-->
<!--    <p>{{ user.username }}</p>-->
<!--    <br>-->
<!--  </div>-->
</template>

<script>

export default {
  name: "UsersPage",
  data() {
    return {
      users: [],
      inputName: '',
      isUsersPage: false,
      isSubscriptionsPage: false,
      isSubscribersPage: false
    }
  },
  computed: {
    profile: {
      get() {
        return this.$store.state.userProf
      },
      set(profile) {
        this.$store.commit('updateProf', profile)
      }
    }
  },
    mounted() {
      fetch("/api/users")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.users = data
      })
      .catch(error => {
        console.log('users getting', error)
      })
    },
    methods: {
      updateList() {
        fetch("/api/users/" + this.inputName)
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
