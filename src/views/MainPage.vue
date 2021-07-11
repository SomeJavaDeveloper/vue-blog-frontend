<!-- MAIN PAGE OF APPLICATION (TODO) -->

<template>
  <MessageListForm></MessageListForm>
</template>

<script>
import MessageListForm from "../components/MessageListForm";

export default {
  components: { MessageListForm },
  name: 'MainPage',
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style>
.block {
  width: 30%;
  padding: 20px;
  display: inline-block;
}
</style>