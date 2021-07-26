<template>
  <div class="main-container__center-container">
    <div class="main-container__new-post" v-show="profile">
      <picture><img src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt=""></picture>
      <h1>#{{ tag }}</h1>
      <a @click="subTag(tag)">
        <button>
          <h1>Subscribe</h1>
        </button>
      </a>
    </div>
    <div v-for="message in messages" :key="message.id" :id="message.id + 1" class="main-container__post">
      <div class="post_name">
        <div class="post_logo">
          <picture>
            <img src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt=""></picture>
        </div>
        <div class="post_profile_name">
          <h1>PROFILE NAME TODO</h1>
        </div>
        <div class="post_profile_nickname">
          <h2>{{ message.user.username }}</h2>
        </div>
        <div style="margin-left: 6px">
          {{ message.creationDate }}
        </div>
        <div style="margin-left: 6px" v-if="profile && profile.id === message.user.id">
          <i @click="deleteMessage(message)" class="fas fa-trash"></i>
        </div>
      </div>
      <div class="post_text">
        <p>{{ message.body }}</p>
      </div>
      <a :href="'#' + message.id">
        <picture><img :src="message.photoLink" alt=""></picture>
      </a>
      <div class="popup" :id="message.id">
        <div class="popup_body">
          <div class="popup_content">
            <a :href="'#' + message.id + 1" class="popup_close">
              <i class="fas fa-times"></i>
            </a>
            <div class="popup_img">
              <img :src="message.photoLink" alt="">
            </div>

          </div>
        </div>
      </div>
      <a class="post_tags">
        <!--          <a @click="subTag(tag)" href="#" v-for="tag in message.tags" :key="tag">-->
        <!--            #{{ tag.content }}-->
        <!--          </a>-->
        <a @click="openTag(tag)" href="#" v-for="tag in message.tags" :key="tag">
          #{{ tag.content }}
        </a>
        <!--          <router-link :to="{ name: 'Profile', params: { tag: this.tag.content }}">#{{ tag.content }}</router-link>-->
      </a>
      <h1 v-if="profile" style="margin-left: 30px; margin-top: 15px;">
        <a @click="like(message.id)" style="font-size: 20px" class="far fa-heart" v-if="!message.userLikes.includes(profile.id)"></a>
        <a @click="unlike(message.id)" style="font-size: 20px" v-else class="fas fa-heart"></a>
        <a @click="repost(message.id)" style="font-size: 20px; margin-left: 15px" class="far fa-flag"></a>
      </h1>
    </div>
  </div>
</template>

<script>

export default {
  name: "TagPage",
  data() {
    return {
      profile: null,
      tag: this.$route.params.tag,
      messages: []
    }
  },
  // computed: {
  //   messages: {
  //     get() {
  //       return this.$store.state.messages
  //     },
  //     set(messages) {
  //       this.$store.commit('updateMessages', messages)
  //     }
  //   }
  // },
  mounted() {
    fetch("/api/tags/" + this.tag)
    .then(response => response.json())
    .then(data => {
      this.messages = data
    })
    .catch(error => {
      console.log('messages getting', error)
    })
    fetch("/api/user")
    .then(response => response.json())
    .then(data => {
      this.profile = data
      this.$store.commit('updateProf', this.profile)
      console.log('Current profile username:', this.profile?.username)
    })
    .catch(error => {
      console.log('user getting error', error)
    })
  },
  methods: {
    subTag(tag) {
      fetch("/api/tags?tag=" + tag.content)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        // something bad happened during the request
        console.log(error)
      })
    },
    unlike(id) {
      let res = this.messages.find(obj => {
        return obj.id === id
      })
      res.userLikes.splice(res, 1)
      fetch("/api/message/unlike/" + id)
      .then(response => response.text())
      .catch(error => {
        console.log('like', error)
      })
    },
    like(id) {
      let res = this.messages.find(obj => {
        return obj.id === id
      })
      res.userLikes.push(this.profile.id)
      fetch("/api/message/like/" + id)
      .then(response => response.text())
      .catch(error => {
        console.log('unlike', error)
      })
    },
    repost(id) {
      console.log(id)
    },
    openTag(tag) {
      this.$router.push({ name: 'Tag', params: { tag: tag.content } })
    },
    deleteMessage(message) {
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

      fetch("/api/message/" + message.id, {
        method: 'DELETE',
        headers: {
          'X-XSRF-TOKEN': csrfToken
        }
      })
      .then(response => response.text())
      .then(response => {
        console.log('Successful delete', response)
        this.messages.splice(this.messages.indexOf(message), 1)
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
