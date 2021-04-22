<template>
  <div class='sidebar'>
    <div class='sidebar__header'>
      <md-avatar/>
      <div class='sidebar__headerRight'>
        <md-button class="md-icon-button">
          <md-icon>donut_large</md-icon>
        </md-button>
        <md-button class="md-icon-button">
          <md-icon>chat</md-icon>
        </md-button>
        <md-button class="md-icon-button">
          <md-icon>more_vert</md-icon>
        </md-button>
      </div>
    </div>
    <!-- <div class='sidebar__search'>
      <div class='sidebar__searchContainer'>
        <md-icon>search</md-icon>
        <input placeholder="start new chat"/>
      </div>c
    </div> -->
    <div class='sidebar__chat'>
      <div v-for="(room, id) in rooms" :key="id">
        <SidebarChatList :room="room" />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarChatList from "@/components/Chat/SidebarChatList";
export default {
  name: "ChatSidebar",
  components : { SidebarChatList },
  props : ['rooms'],
}
</script>

<style scoped>
.sidebar{
  display: flex;
  flex-direction: column;
  flex: 0.30;
}
.sidebar__header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-right: 1px solid lightgrey;
}
.sidebar__headerRight{
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width:  10vw;
}
.sidebar__headerRight > i {
  margin-right: 2vw;
  font-size: 24px !important;
}
.sidebar__search {
  display: flex;
  align-items: center;
  background-color: #f6f6f6;
  height: 30px;
  padding: 10px;
}
.sidebar__searchContainer {
  display: flex;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 35px;
  border-radius: 20px;
}
.sidebar__searchContainer > input {
  border: none;
  margin-left: 10px;
}
.sidebar__searchContainer > .md-icon{
  margin: unset;
  color: gray;
}
.sidebar__chat {
  flex: 1;
  background-color: white;
  overflow-y: hidden;
}
.sidebar__chat:hover {
  overflow-y: auto;
}
</style>
