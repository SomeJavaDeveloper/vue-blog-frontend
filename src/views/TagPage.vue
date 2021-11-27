<template>

  <div class="main-container">
    <UserInfo></UserInfo>

    <div class="main-container__center-container">
      <div class="main-container__new-post" v-show="profile">
        <picture><img src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt=""></picture>
        <h1 id="tagInHat">#{{ $route.params.tagContent }}</h1>
        <a @click="subTag">
          <button v-if="!isUserSubbed">
            Subscribe
          </button>
          <button v-else>
            Unsubscribe
          </button>
        </a>
      </div>
      <div v-if="messages != null">
        <div v-for="message in messages" :key="message.id" :id="message.id + 1" class="main-container__post">
          <div class="post_name">
            <div class="post_logo">
              <picture>
                <img :src="message.userPhotoLink" alt=""></picture>
            </div>
            <div class="post_profile_name">
              <router-link
                :to="{ name: 'Profile', params: { username: message.username }}">
                <h1>{{ message.username }}</h1>
              </router-link>
            </div>
            <div style="margin-left: 6px">
              {{new Date(message.creationDate).toLocaleDateString()}}  {{new Date(message.creationDate).toLocaleTimeString()}}
            </div>
            <div style="margin-left: 6px" v-if="profile && profile.id === message.userId">
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
            <router-link
              v-for="tag in message.tags" :key="tag"
              :to="{ name: 'Tag', params: { tagContent: tag }}" @click="initialize">
              #{{ tag }}
            </router-link>
            <!--          <router-link :to="{ name: 'Profile', params: { tag: this.tag.content }}">#{{ tag.content }}</router-link>-->
          </a>
          <h1 v-if="profile" style="margin-left: 30px;" class="share">
            <a @click="like(message.id)" style="font-size: 20px" class="far fa-heart" v-if="!message.userLikes.includes(profile.id)"></a>
            <a @click="unlike(message.id)" style="font-size: 20px" v-else class="fas fa-heart"></a>
            <a @click="repost(message.id)" style="font-size: 20px; margin-left: 15px" class="far fa-flag"></a>
          </h1>
        </div>
        <h1 style="text-align: center" @click="fetchMessages">Show more</h1>
      </div>
    </div>


    <div class="main-container__right-container" v-if="tags !== undefined" >
      <div class="trending">
        <h1>Trending now</h1>
      </div>

      <router-link @click="openTag(tag)"
        v-for="tag in tags.slice(0, 5)" :key="tag"
        :to="{ name: 'Tag', params: { tagContent: tag.content }}">
        <div class="trend">
          <h1>#{{ tag.content }}</h1>
          <h3>{{ tag.numberOfSubscribers }} followers</h3>
        </div>
      </router-link>
      <div class="show-more">
        <router-link :to="{ name: 'Tags'}">
          <h1>Show more</h1>
        </router-link>
      </div>
    </div>


  </div>
</template>

<script>
import UserInfo from "../components/UserInfo";
export default {
  name: "TagPage",
  components: {UserInfo},
  data() {
    return {
      profile: null,
      tag: null,
      tagObject: null,
      tags: [],
      messages: [],
      isUserSubbed: false,
      pageNumber: 1
    }
  },
  mounted() {
    this.pageNumber = 1
    this.tags = []
    this.initializePopular()
    this.fetchTagsAndMessages(this.$route.params.tagContent)
    this.initialize()
  },
  methods: {
    fetchMessages() {
      fetch("/api/tags/messages/" + this.$route.params.tagContent + "?page=" + this.pageNumber)
      .then(response => response.json())
      .then(data => {
        this.messages = this.messages.concat(data.filter(item =>
          !JSON.parse(JSON.stringify(this.messages)).includes(JSON.parse(JSON.stringify(item)))
        ))
        this.pageNumber++
        console.log(this.pageNumber)
      })
      .catch(error => {
        console.log('messages getting', error)
      })
    },
    openTag(newTag) {
      this.tag = newTag
      this.initializePopular()
      this.fetchTagsAndMessages(this.tag.content)
      this.initialize()
    },
    initialize() {
      this.initializePopular()
      fetch("/api/user")
          .then(response => response.json())
          .then(data => {
            this.profile = data
            this.$store.commit('updateProf', this.profile)
            this.isUserSubbed = false
            this.tags.forEach(tag => {
              this.profile.subTags.forEach(userTag => {
                if (tag.id === userTag.id && tag.content === this.$route.params.tagContent)
                  this.isUserSubbed = true
              })
            })
          })
          .catch(error => {
            console.log('user getting error', error)
          })
    },
    initializePopular() {
      fetch("/api/tags/popular")
      .then(response => response.json())
      .then(data => {
        this.tags = data
      })
      .catch(error => {
        console.log('logout', error)
      })
    },
    fetchTagsAndMessages(tagContent) {
      this.messages = null
      fetch("/api/tags/messages/" + tagContent) // вот тут проблемка
      .then(response => response.json())
      .then(data => {
        this.messages = data
      })
      .catch(error => {
        console.log('messages getting', error)
      })
    },
    subTag() {
      fetch("/api/tags?tag=" + this.$route.params.tagContent)
      .then(response => response.json())
      .then(data => {
        this.profile = data
        this.isUserSubbed = !this.isUserSubbed
      })
      .catch(error => {
// something bad happened during the request
        console.log(error)
      })
      this.initializePopular()
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

