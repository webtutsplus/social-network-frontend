<template>
  <div class='sidebar'>
    <SidebarRow :title="username"/>
    <SidebarRow Icon='local_hospital' title='COVID-19 Information Center' />
    <SidebarRow Icon="emoji_flags" title='Pages'/>
    <SidebarRow Icon="people" title='Friends' link="friends"/>
    <SidebarRow Icon="chat" title='Messenger' link="chat"/>
    <SidebarRow Icon="storefront" title='Marketplace'/>
    <SidebarRow Icon="video_library" title='Videos'/>
  </div>
</template>

<script>
import SidebarRow from "./PostSidebarRow";
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
