<template>
  <div class="app">
    <div class='app__body'>
      <Sidebar/>
      <ChatView />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/views/Sidebar";
import ChatView from "@/views/ChatView";

export default {
name: "wChat",
  components : {Sidebar,ChatView}
}
</script>

<style scoped>
.app {
  display: grid;
  place-items: center;
  background-color: #dadbd3;
  height: 100vh;
}

.app__body {
  display: flex;
  background-color: #ededed;
  height: 90vh;
  width: 90vw;
  box-shadow: -1px 4px 20px -6px rgba(0,0,0,0.75);
}


</style>
