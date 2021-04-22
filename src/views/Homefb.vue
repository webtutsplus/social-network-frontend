<template>
  <div class="app__body">
    <div class="row">
      <div class="col-3">
        <PostSidebar id="sidebar"/>
      </div>
      <div class="col-6" style="min-height:800px">
        <posts id="post"/>
      </div>
      <div class="col-3">
        <list-friends id="friends"/>
      </div>
    </div>
  </div>
</template>

<script>

import Posts from "@/components/Post/Posts";
import ListFriends from "@/views/ListFriends";
import PostSidebar from "@/components/Post/PostSidebar";

export default {
  name: "Homefb",
  components: {PostSidebar, Posts, ListFriends},
}
</script>

<style scoped>

.app__body {
  background-color: #f1f2f5;
}
#sidebar{
  position: absolute;
}
#post{
  position: relative;
}
#friends{
  position: relative;
}
</style>
