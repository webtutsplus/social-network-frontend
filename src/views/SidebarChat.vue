<template>
  <div class='sidebarChat' v-if="!addNewChat">

    <md-avatar>
      <img src="https://avatars.githubusercontent.com/u/32813584?s=60&v=4">
    </md-avatar>
    <div class='sidebarChat__info'>
      <h2>Room Name</h2>
      <p>Last message...</p>
    </div>
  </div>

  <div class='sidebarChat' v-else onClick={createChat()} >
    <h2>add new chat</h2>
  </div>
</template>

<script>
export default {
name: "SidebarChat",
  props : ['addNewChat'],
  methods : {
    createChat() {
      const roomname = prompt("please enter name for chat");
      if(roomname){
        //do some stuff
      }
    }
  }
}
</script>

<style scoped>
.sidebarChat {
  display: flex;
  padding: 20px;
  cursor: pointer;
  border-bottom: 1px solid #f6f6f6;
}

.sidebarChat > .md-avatar {
  margin: unset;
}

.sidebarChat:hover {
  background-color: #ebebeb;
}

.sidebarChat__info > h2 {
  font-size: 16px;
  margin-bottom: 8px;
}

.sidebarChat__info {
  margin-left: 15px;
}

</style>
