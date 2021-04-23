<template>
  <div v-if="fetched" class="app">
    <div class='app__body'>
      <ChatSidebar :rooms="rooms"/>
      <ChatView :room="firstRoom" />
    </div>
  </div>
  <div v-else>
    <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
  </div>
</template>

<script>
import ChatView from "@/components/Chat/ChatView";
import axios from 'axios';
import {API_BASE_URL} from '/src/config.js';
import firebase from "../firebase";
import ChatSidebar from "@/components/Chat/ChatSidebar";

export default {
  name: "Chat",
  components : {ChatSidebar, ChatView},
   data() {
    return {
      fetched : false,
      friends: [],
      email: '',
      rooms: [],
      firstRoom: {},
      username: localStorage.getItem('username'),
      ref: firebase.database().ref('chatrooms/')
    }
  },
  methods: {
    getRooms(){
      axios.get(`${API_BASE_URL}private/rooms`,{'headers' :{
            'Authorization': 'Bearer '+localStorage.getItem('idToken'),
          }}).then(resp => {
            this.fetched =true
            if(resp.status === 200){
              this.rooms = resp.data;
              console.log("rooms", this.rooms);
              if (this.rooms.length > 0) {
                //update chatview by first user
                console.log("update chatview by first room", this.rooms[0]);
                this.firstRoom = this.rooms[0];
              }
            }
        }).catch((err) => {
          console.log("coming in error", err);
          this.$router.push('/login');
          });
    }
  },
  mounted() {
    if (!this.username) {
      this.$router.push('/login')
    }
    else {
      this.getRooms();
    }
  }
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

.md-progress-spinner {
  place-self: center;
}
</style>
