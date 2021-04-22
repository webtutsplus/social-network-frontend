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
        <SidebarChat :room="room" />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarChat from "@/views/SidebarChat";
export default {
  name: "Sidebar",
  components : { SidebarChat },
  props : ['rooms'],
}
</script>

<style scoped>
.sidebar {
  padding: 25px 10px;
  flex: 0.33;
}
</style>