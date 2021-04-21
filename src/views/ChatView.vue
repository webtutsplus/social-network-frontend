<template>
  <div class="chat">
    <div class="chat__header">
      <md-avatar class="md-large">
        <!-- https://avatars.githubusercontent.com/u/32813584?s=60&v=4 -->
        <img :src="avatar" />
      </md-avatar>
      <div class="chat__headerInfo">
        <h3> {{friend.email}}</h3>
        <p> Last seen at ...</p>
      </div>

      <div class="chat__headerRight">
        <md-button class="md-icon-button">
          <md-icon >search</md-icon>
        </md-button>
        <md-button class="md-icon-button">
          <md-icon>attach_file</md-icon>
        </md-button>
        <md-button class="md-icon-button">
          <md-icon>more_vert</md-icon>
        </md-button>
      </div>
    </div>
    <div class="chat__body" id="container">
      <div v-for="chat in chats" :key="chat.key">
        <p :class='`chat__message ${isMe(chat) && "chat__reciever"}`' >
          {{chat.message}}
        </p>
      </div>

    </div>
    <div class="chat__footer">
      <md-icon>insert_emoticon</md-icon>
      <form v-on:submit.prevent="onSubmit">
        <input type="text" id="inputMsg"/>
        <button type="submit" >send a message</button>
      </form>
      <md-icon>mic</md-icon>
    </div>
  </div>
</template>

<script>
import firebase from '../firebase';

export default {
  name: "Chat",
  props : ['room'],
  data () {
    return {
      chats: [],
      ref: firebase.database().ref('chatrooms/'),
      roomid: null,
      avatar: null,
      friend: {}
    }
  },
  methods : {
    onSubmit(){
      const msg = document.getElementById("inputMsg").value;
      console.log("msg on submit", msg);
      let newData = firebase.database().ref('chatrooms/'+this.roomid+'/chats').push();
      newData.set({
        type: 'newmsg',
        user: localStorage.getItem("username"),
        message: msg,
        sendDate: Date()
      });
      //this.data.message = '';
      document.getElementById("inputMsg").value = '';
    },
    isMe(chat){
      return chat.user == this.email;
    },
    getPreviousChats (roomId) {
      firebase.database().ref('chatrooms/'+roomId+'/chats').on('value', (snapshot) => {
        this.chats = [];
        snapshot.forEach((doc) => {
          let item = doc.val()
          item.key = doc.key
          this.chats.push(item)
        });
        console.log("chats",this.chats);
      });
    },
    getRoomName(room) {
         console.log("room name is ", room);
          this.ref.orderByChild('roomName').equalTo(room).once('value', snapshot => {
          if (snapshot.exists()) {
            console.log('Room Exists');
            snapshot.forEach((doc) => {
              console.log("roomId", doc.key);
              this.roomid = doc.key;
              this.getPreviousChats(doc.key)
            })
          } else {
            // create a new doc
              let newData = this.ref.push()
              newData.set({
                roomName: room
              });
              // after creating the room, get the chats again by recursive function
              this.getRoomName(room);
          }
        })
    },
    displayFirstRoom(){
      this.friend = this.room.user;
      this.getRoomName(this.room.meetingRoom);
      this.avatar = this.friend.picture;
    }
  },
  mounted(){
    var container = this.$el.querySelector("#container");
    container.scrollTop = container.scrollHeight;
    this.$root.$on('updateChatViewEvent', room => {
          console.log("retriving", room);
          this.room = room;
          this.friend = room.user;
          this.getRoomName(room.meetingRoom);
          this.avatar = this.friend.picture;
          var container = this.$el.querySelector("#container");
          container.scrollTop = container.scrollHeight;
      });
      this.displayFirstRoom();
      this.email = localStorage.getItem("username");
  }
}
</script>

<style scoped>
.chat {
  flex: 0.70;
  display: flex;
  flex-direction: column;
}

.chat__header {
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;
}

.chat__headerInfo {
  flex: 1;
  padding-left: 20px;

}

.chat__headerInfo > h3 {
  margin-bottom: 3px;
  font-weight: 500;
}

.chat__headerInfo > p {
  color: gray;
}

.chat__headerRight {
  display: flex;
  justify-content: space-between;
  min-width: 100px;
}

.chat__body {
  flex: 1;
  background: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png") repeat center;
  padding: 30px;
  overflow-y: auto;
}

.chat__message {
  position: relative;
  font-size: 16px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  width: fit-content ;
  margin-bottom: 30px;
}

.chat__name {
  position: absolute;
  top: -15px;
  font-weight: 800;
  font-size: xx-small;
}

.chat__timestamp {
  margin-left: 10px;
  font-size: xx-small;
}

.chat__reciever {
  margin-left: auto;
  background-color: #b0ffb0;
}

.chat__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  border-top: 1px solid lightgray;
}

.chat__footer > form {
  flex: 1;
  display: flex;
}

.chat__footer > form > input {
  flex: 1;
  border-radius: 30px;
  padding: 10px;
  border: none ;
}
.chat__footer > form > button {
  display: none;
}
.chat__footer > md-icon {
  padding: 10px;
  color: gray;
}

</style>
