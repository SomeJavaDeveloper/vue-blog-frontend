<!-- MAIN PAGE OF APPLICATION (TODO) -->

<template>
  <h2 class="block" style="text-align: left">Main page of application</h2>
  <h2 class="block" style="text-align: right">Log in</h2>

  <MessageListForm></MessageListForm>
</template>

<script>
import MessageListForm from "./MessageListForm";

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