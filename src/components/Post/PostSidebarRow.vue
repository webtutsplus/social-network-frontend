<template>
  <div class='sidebarRow'>
    <div v-if="src">
      <md-avatar> <img :src="src" alt=""/> </md-avatar></div>
    <div v-if="Icon" class="icon">
      <md-icon md-theme="color">{{Icon}}</md-icon>
    </div>
    <h5>{{ title }}</h5>
  </div>
</template>

<script>
export default {
name: "SidebarRow",
  props: [
    'src','Icon','title'
  ]
}
</script>

<style scoped>
.sidebarRow {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

.sidebarRow:hover{
  background-color: lightgray;
  border-radius: 10px;
}

.sidebarRow > h5 {
  margin-left: 20px;
  font-weight: 500;
}

.sidebarRow > .icon {
  font-size: xx-large;
  color: gray;
}
</style>