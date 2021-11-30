<!-- MAIN PAGE OF APPLICATION (TODO) -->

<template>
  <div class="main-container">

    <UserInfo></UserInfo>

    <MessageListForm></MessageListForm>

    <TagBox></TagBox>

  </div>
</template>

<script>

import {useRoute} from 'vue-router';
import {computed} from 'vue';
import MessageListForm from "../components/MessageListForm";
import TagBox from "../components/TagBox";
import UserInfo from "../components/UserInfo";

export default {
  components: {UserInfo, MessageListForm, TagBox },
  name: 'MainPage',
  data() {
    return {
      tags: [],
      route: useRoute(),
      path: computed(() =>this.route.path)
    }
  },
  methods: {
    openTagMain(tag) {
      this.$router.push({ name: 'Tag', params: { tag: tag.content } })
    },
  }
}
</script>

<style>
</style>
