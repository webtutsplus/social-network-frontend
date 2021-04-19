<template>
  <b-container>
    <b-row>
      <b-col class="pt-5">
        <h5 class="text-center">Welcome to </h5>
        <h1 class="pb-3 text-center">The Social Network</h1>

        <p id="username" class="text-center text-muted"> You are not logged in </p>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
// import firebase from 'firebase';
import $ from 'jquery'

export default {
  name: 'Home',
  data() {
    return {
      username : localStorage.getItem('username')
    }
  },
  methods: {
    checkLoggedIn: function () {
      if (this.username) {
        $('#username').html(`You are logged in as ${this.username}`);
      }
    }
  },
  mounted() {
    this.checkLoggedIn();
  }
}
</script>
