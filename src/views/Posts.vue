<template>
  <div>
    <div class='messageSender'>
      <div class='messageSender__top'>
        <md-avatar><md-icon>account_circle</md-icon></md-avatar>
        <form>
          <input class='messageSender__input' placeholder="what's on your mind" v-model="content"/>
          <input placeholder='image URL (Optional)'/>
          <button type='submit' @click="addpost($event)">hidden submit</button>
        </form>
      </div>
      <div class='messageSender__bottom'>
        <div class='messageSender__option'>
          <md-icon style="color: red">videocam</md-icon>
          <h3>Live Video</h3>
        </div>

        <div class='messageSender__option'>
          <md-icon style="color: green">photo_library</md-icon>
          <h3>Photo/Video</h3>
        </div>

        <div class='messageSender__option'>
          <md-icon style="color: orange">insert_emoticon</md-icon>
          <h3>Feeling/Activity</h3>
        </div>
      </div>
    </div>
    <div class='post' v-for="post in posts" :key="post.id">
      <div class='post__top' >
        <div class="post__avatar">
          <md-avatar class="md-large">
            <img  :src="post.user.picture"/>
          </md-avatar>
        </div>
        <div class='post__topinfo' >
          <h3>{{post.user.name}}</h3>
          <p>timestamp...</p>
        </div>
      </div>

      <div class='post__bottom' >
        <p>{{ post.content }}</p>
      </div>

      <div class='post__options'>
        <div class='post__option'>
          <p>
          <div class="icon__text">
            <md-icon>thumb_up</md-icon>
            Like
          </div>
        </div>
        <div class='post__option'><p>
          <div class="icon__text">
            <md-icon>chat_bubble</md-icon>
            Comment
          </div>
        </div>
        <div class='post__option'><p>
          <div class="icon__text">
            <md-icon>near_me</md-icon>
            Share
          </div>
        </div>
        <div class='post__option'><p>
          <div class="icon__text">
            <md-icon>account_circle</md-icon>
            Account info</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import axios from "axios";
import {API_BASE_URL} from '/src/config.js';
export default {
  name: "Posts",
  data() {
    return {
      posts: [],
      content: "",
      users: [],
      selected: null,
      user: null,
    }
  },
  mounted() {
    this.getPost();
  },
  methods: {
    getPost() {
      axios.get(API_BASE_URL + "public/posts").then(resp => {
        this.posts = resp.data
      });
    },
    getmypost() {
      axios.get(API_BASE_URL + "private/mypost", {
        "headers": {
          "Authorization": "Bearer " + localStorage.getItem("idToken")
        }
      }).then(res => {
        this.posts = res.data
      }).catch(err => console.log(err));
    },
    addpost(e) {
      e.preventDefault();
      axios.post(API_BASE_URL + "private/addpost", {"content": this.content}, {
        "headers": {
          "Authorization": "Bearer " + localStorage.getItem("idToken")
        }
      }).then(res => {
        alert("post added");
        console.log(res.data);
      }).catch(err => console.log(err));
    }
  }
}
</script>

<style scoped>

.messageSender {
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 5px 7px -7px rgba(0,0,0,0.75);
  width: 100%;
}

.messageSender__top {
  display: flex;
  border-bottom: 1px solid #eff2f5;
  padding: 15px;
}

.messageSender__top > form {
  flex: 1;
  display: flex;
}

.messageSender__top > form > input {
  outline-width: 0;
  border: none;
  padding: 5px 20px;
  margin: 0px 10px;
  border-radius: 999px;
  background-color: #eff2f5;
}

.messageSender__top > form > button {
  display: none;
}

.messageSender__input {
  flex: 1;
}

.messageSender__bottom {
  display: flex;
  justify-content: space-evenly;
}

.messageSender__option {
  padding: 20px;
  display: flex;
  align-items: center;
  color: gray;
  margin: 5px;
}

.messageSender__option > h3 {
  font-size: medium;
  margin-left: 10px;
  cursor: pointer;
}

.messageSender__option:hover {
  background-color: #eff2f5;
  border-radius: 20px;
}

.post {
  width: 100%;
  margin-top: 15px;
  border-radius: 15px;
  align-items: center;
  background-color: white;
  box-shadow: 0px 5px 7px -7px rgba(0,0,0,0.75);
}

.post__top {
  display: flex;
  position: relative;
  align-items: center;
  padding: 15px;
}

.post__avatar {
  margin-right: 10px;
}

.post__topinfo > h3 {
  font-size: medium;
}

.post__topinfo > p {
  font-size: small;
  color: gray;
}

.post__bottom {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 15px 25px;

}

.post__image > img {
  width: 100%;
}

.post__options {
  border-top: 1px solid lightgray;
  display: flex;
  justify-content: space-evenly;
  font-size: medium;
  color: gray;
  cursor: pointer;
  padding: 15px;
}

.post__option {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.icon__text {
  padding-left: 15px;

}

.post__option:hover {
  background-color: #eff2f5;
  border-radius: 10px;
}

</style>
