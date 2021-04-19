<template>
  <b-container>
    <b-row>
      <b-col class="pt-5">
        <b-list-group class="list-group">
          <b-list-group-item class="d-flex justify-content-around" v-for="item in users" v-bind:key="item.id">
            <div class="col-4" v-if="item.name === null">
              {{item.email}}
            </div>
            <div class="col-4" v-else>
              {{item.name}}
            </div>

            <div class="col-4 text-center" >
              <img class="img"  thumbnail v-bind:src="item.picture" alt="avatar">
            </div>
            <div class="col-4 text-right">
              <button class="btn btn-primary pull-right" @click="fetchRoom(item.id, item.name || item.email)">Chat</button>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
import {API_BASE_URL} from '/src/config.js';
import firebase from "../firebase";

export default {
  name: "ListFriends",
  data() {
    return {
      users: [],
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
          this.users = resp.data;
        }
      }).catch(err => console.log(err))
    },
    fetchRoom(id, friendName) {
      console.log(id);
      axios.get(`${API_BASE_URL}private/getRoomName?friendId=${id}`, {'headers':{
          'Authorization': 'Bearer '+localStorage.getItem('idToken'),
      }}).then(resp => {
        console.log(resp.data);
        this.ref.orderByChild('roomName').equalTo(resp.data).once('value', snapshot => {
          if (snapshot.exists()) {
            console.log('Room Exists');
            snapshot.forEach((doc) => {
              console.log(doc.key);
              this.$router.push({name: 'Chat', params: {nickname: localStorage.getItem('username'), roomid: doc.key, roomname: resp.data, friend: friendName}});
              return true;
            })
          }
          else {
            console.log("Does not Exist")
            let newData = this.ref.push()
            newData.set({
              roomName: resp.data
            })
          }
        })
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

.img{
  max-width: 70px;
  max-height: 70px;
}
</style>
