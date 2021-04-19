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

              <div class="col-4 text-center">
                <img class="img" v-bind:src="item.picture" alt="avatar">
              </div>
              <div v-if="email !== item.email" class="col-4 text-right">
                <button v-if="username" class="btn btn-primary pull-right" @click="addfriend(item.id)">Add Friend</button>
                <button v-else class="btn btn-primary pull-right" @click="goToLogin()">Add Friend</button>
              </div>

              <div v-else class="col-4 text-right">

              </div>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';
import {API_BASE_URL} from '/src/config.js';

export default {
  name: "listusers",
  data() {
    return {
      users: [],
      email: '',
      username: null
    }
  },
   mounted() {
    this.getusers();
    //console.log(firebase.auth().currentUser.email)
    this.email = firebase.auth().currentUser.email;
    this.username = localStorage.getItem('username');
  },
  methods: {
    getusers() {
      const url = `${API_BASE_URL}public/users`;
      axios.get(url).then(resp => {
        console.log(resp);
        if(resp.status === 200){
          this.users = resp.data;
        }else {
          console.log("bad request by client")
        }
      }).catch(err => {
        console.log(err)
      })
    },
    addfriend(id){
      axios.get(`${API_BASE_URL}private/addFriend/?friendId=${id}`,{'headers' :{
          'Authorization': 'Bearer '+localStorage.getItem('idToken'),
        }}).then(resp => {
          console.log(resp.data);
          if(resp.status === 200){
            alert("friend added! ");
          }
      }).catch(err => console.log(err))
    },
    goToLogin() {
      this.$router.push('/login');
    }
  },

}
</script>

<style scoped>

.img{
  max-width: 70px;
  max-height: 70px;
}

</style>
