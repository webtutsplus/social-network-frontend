<template>
  <div class='sidebar'>
    <sidebar-row :title="username"/>
    <sidebar-row Icon='local_hospital' title='COVID-19 Information Center' />
    <sidebar-row Icon="emoji_flags" title='Pages'/>
    <sidebar-row Icon="people" title='Friends'/>
    <sidebar-row Icon="chat" title='Messenger'/>
    <sidebar-row Icon="storefront" title='Marketplace'/>
    <sidebar-row Icon="video_library" title='Videos'/>
  </div>
</template>

<script>
import SidebarRow from "./SidebarRow";
export default {
  name: "Sidebar",
  components: {SidebarRow},
  username: '',

  mounted() {
    this.username = localStorage.getItem('username');
    if(this.username === '' || !this.username){
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.sidebar {
  padding: 25px 10px;
  flex: 0.33;
}
</style>
