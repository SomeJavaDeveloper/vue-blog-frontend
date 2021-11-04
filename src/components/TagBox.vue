<template>
  <div class="main-container__right-container">
    <div class="trending">
      <h1>Trending now</h1>
    </div>
    <router-link
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
</template>

<script>

export default {
  name: "TagBox",
  data() {
    return {
      tags: []
    }
  },
  mounted() {
    this.initializePopular()
  },
  methods: {
    initializePopular() {
      fetch("/api/tags/popular")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.tags = data
      })
      .catch(error => {
        console.log('logout', error)
      })
    }
  }
}
</script>
