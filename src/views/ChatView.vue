<template>
  <div class="chat">
    <div class="chat__header">
      <md-avatar class="md-large">
        <img src="https://avatars.githubusercontent.com/u/32813584?s=60&v=4" />
      </md-avatar>
      <div class="chat__headerInfo">
        <h3> Room Name</h3>
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
    <div class="chat__body">
      <p :class='`chat__message ${true && "chat__reciever"}`'>

      <span class="chat__name">
                        someOne</span>
      hey guys
      <span class="chat__timestamp">
                        13:15
                    </span>
      </p>
      <p class="chat__message">
        hey guys
      </p>
    </div>
    <div class="chat__footer">
      <md-icon>insert_emoticon</md-icon>
      <form>
        <input type="text"/>
        <button type="submit" onClick={sendMessage()}>send a message</button>
      </form>
      <md-icon>mic</md-icon>
    </div>
  </div>
</template>

<script>
export default {
name: "Chat",
  methods : {
    sendMessage(e){
      e.preventDefault();
    }
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
  background: repeat center;
  padding: 30px;
  overflow-y: auto;
}

.chat__message {
  position: relative;
  font-size: 16px;
  padding: 10px;
  background-color: green;
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
  background-color: yellow;
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
