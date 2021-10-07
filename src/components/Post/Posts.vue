<template>
  <div id="post">
    <div class="messageSender">
      <div class="messageSender__top">
        <md-avatar>
          <md-icon>account_circle</md-icon>
        </md-avatar>
        <form>
          <input
            class="messageSender__input"
            placeholder="what's on your mind"
            v-model="content"
            @click="add = true"
          />
          <input placeholder="image URL (Optional)" />
          <button type="submit" @click="addpost($event)">hidden submit</button>
        </form>
      </div>
    </div>

    <div v-if="add" id="popup1" class="overlay">
      <div class="popup">
        <h4>Create a Post</h4>
        <a class="close" @click="add = false">&times;</a>
        <hr />
        <div class="content">
          <form>
            <md-field>
              <md-textarea
                v-model="content"
                style="width: 100%; border: none"
                placeholder="what's on you mind?"
                required
              ></md-textarea>
            </md-field>
            <div class="messageSender__bottom">
              <div class="messageSender__option">
                <md-icon style="color: red">videocam</md-icon>
                <h3>Live Video</h3>
              </div>

              <div class="messageSender__option">
                <md-icon style="color: green">photo_library</md-icon>
                <h3>Photo/Video</h3>
              </div>

              <div class="messageSender__option">
                <md-icon style="color: orange">insert_emoticon</md-icon>
                <h3>Feeling/Activity</h3>
              </div>
            </div>
            <MdButton
              class="submit__post"
              style="color: white"
              @click="addpost($event)"
              >post</MdButton
            >
          </form>
        </div>
      </div>
    </div>

    <div class="post" v-for="post in posts" :key="post.id">
      <div v-if="post.user" class="post__top">
        <div class="post__avatar">
          <md-avatar class="md-large">
            <img
              :src="`${post.user.picture}`"
              v-if="post.user && post.user.picture != null"
            />
            <img
              src="https://avatars.githubusercontent.com/u/32813584?s=60&v=4"
              v-else
            />
          </md-avatar>
        </div>
        <div class="post__topinfo">
          <h3>{{ post.user.email }}</h3>
          <p>{{ post.createdDate }}</p>
        </div>
      </div>

      <div class="post__bottom">
        <p>{{ post.content }}</p>
      </div>

      <div class="post__options">
        <div class="post__option">
          <p></p>
          <div class="icon__text">
            <md-icon>thumb_up</md-icon>
            Like
          </div>
        </div>
        <div class="post__option">
          <p></p>
          <div class="icon__text">
            <md-icon>chat_bubble</md-icon>
            Comment
          </div>
        </div>
        <div class="post__option">
          <p></p>
          <div class="icon__text">
            <md-icon>near_me</md-icon>
            Share
          </div>
        </div>
        <div class="post__option">
          <p></p>
          <div class="icon__text">
            <md-icon>account_circle</md-icon>
            Account info
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { API_BASE_URL } from "/src/config.js";
import $ from "jquery";

export default {
  name: "Posts",
  data() {
    return {
      add: false,
      posts: [],
      content: "",
      users: [],
      selected: null,
      user: null,
    };
  },
  mounted() {
    this.getPosts();
    this.clone.item = $("#post").clone();
  },
  methods: {
    getPosts() {
      axios
        .get(API_BASE_URL + "public/posts")
        .then((resp) => {
          this.posts = resp.data;
        })
        .catch((err) => {
          console.log(err);
          //this.$router.push('/login');
          if (err.response.status == 401) {
            this.$router.push("/login");
          }
        });
    },
    getmypost() {
      axios
        .get(API_BASE_URL + "private/mypost", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("idToken"),
          },
        })
        .then((res) => {
          this.posts = res.data;
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401) {
            this.$router.push("/login");
          }
        });
    },
    addpost(e) {
      e.preventDefault();
      axios
        .post(
          API_BASE_URL + "private/addpost",
          { content: this.content },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("idToken"),
            },
          }
        )
        .then((res) => {
          this.content = "";
          //alert("post added");
          console.log(res.data);
          this.add = false;
          this.getPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.messageSender {
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 5px 7px -7px rgba(0, 0, 0, 0.75);
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
  width: fit-content;
  justify-content: space-between;
}

.messageSender__option {
  padding: 0px;
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
  box-shadow: 0px 5px 7px -7px rgba(0, 0, 0, 0.75);
}

.post__top {
  display: flex;
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

.box {
  width: 50%;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.2);
  padding: 35px;
  border: 2px solid #fff;
  border-radius: 20px/50px;
  background-clip: padding-box;
  text-align: center;
}

.button {
  font-size: 1em;
  padding: 10px;
  color: #fff;
  border: 2px solid #06d85f;
  border-radius: 20px/50px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.button:hover {
  background: #06d85f;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: visible;
  opacity: 1;
}

/*.overlay:target {*/
/*  visibility: visible;*/
/*  opacity: 1;*/
/*}*/

.popup {
  z-index: 100;
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 5s ease-in-out;
}

.popup h4 {
  width: 100%;
  margin-top: 0;
  text-align: center;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}

.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

.popup .close:hover {
  color: #06d85f;
}

.popup .content {
  max-height: 30%;
}

@media screen and (max-width: 700px) {
  .box {
    width: 70%;
  }

  .popup {
    width: 70%;
  }
}

.submit__post {
  background: blue;
  color: white;
  width: 100%;
  margin-left: 0px;
}
</style>
