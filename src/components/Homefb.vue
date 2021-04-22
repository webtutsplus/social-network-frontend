<template>
  <div class="app__body">
    <div class="row">
      <div class="col-3">
        <sidebar id="sidebar"/>
      </div>
      <div class="col-6" style="min-height:800px">
        <posts id="post"/>
      </div>
      <div class="col-3">
        <list-friends/>
      </div>
    </div>
  </div>
</template>

<script>

import Sidebar from "../views/Sidebar";
import Posts from "../views/Posts";
import ListFriends from "../views/ListFriends";

export default {
  name: "Homefb",
  components: {Sidebar, Posts, ListFriends},
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
</style>
