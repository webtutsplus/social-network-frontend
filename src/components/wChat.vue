<template>
  <div class="app">
    <div class='app__body'>
      <Sidebar :friends="friends"/>
      <ChatView />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/views/Sidebar";
import ChatView from "@/views/ChatView";
import axios from 'axios';
import {API_BASE_URL} from '/src/config.js';
import firebase from "../firebase";

//TODO
//loader icon
// on send msg scroll the chatbox to see latest msgs
// change color and background of chats
// when server send 404, redirect to login page


// Increase the login time per user

export default {
name: "wChat",
  components : {Sidebar, ChatView},
   data() {
    return {
      friends: [],
      email: '',
      username: localStorage.getItem('username'),
      ref: firebase.database().ref('chatrooms/')
    }
  },
  methods: {
    listFriends(){
      axios.get(`${API_BASE_URL}private/listFriends`,{'headers' :{
          'Authorization': 'Bearer '+localStorage.getItem('idToken'),
        }}).then(resp => {
        console.log(resp.data);
        if(resp.status === 200){
          this.friends = resp.data;
          console.log("friends", this.friends);
        }
      }).catch(err => console.log(err))
    }
  },
  mounted() {
    if (!this.username) {
      this.$router.push('/login')
    }
    else {
      this.listFriends();
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


</style>
