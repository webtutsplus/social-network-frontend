<template>
  <!-- Navbar -->
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="/"><img id="logo" src="/assets/icon.png" class="img-fluid" /></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link class="nav-link" :to="'/'">Home</router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link class="nav-link" :to="'/listusers'">Users</router-link>
          </b-nav-item>

          <b-nav-item v-if="!username">
            <router-link class="nav-link"  :to="'/login'">Chat</router-link>
          </b-nav-item>

          <b-nav-item v-if="!username">
            <router-link class="nav-link"  :to="'/login'">Log In</router-link>
          </b-nav-item>

          <b-nav-item v-if="!username">
            <router-link class="nav-link" :to="'/signup'">Sign Up</router-link>
          </b-nav-item>

          <b-nav-item v-else>
            <a class="nav-link" href="#" @click="signOut">Sign Out</a>
          </b-nav-item>


          <b-nav-item v-if="username">
            <router-link class="nav-link"  :to="'/room/'+this.username">Chat</router-link>
          </b-nav-item>

          <b-nav-item v-if="username">
            <router-link class="nav-link"  :to="'/friends'">Friends</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
  <!-- Navbar Ends -->

</template>

<script>
import firebase from 'firebase';
export default {
  name: "Navbar",
  data() {
    return {
      username : localStorage.getItem('username')
    }
  },
  watch: {
    $route() {
      this.username = localStorage.getItem('username')
    }
  },
  methods: {
    signOut() {
      firebase.auth().signOut().then(() => {
        localStorage.removeItem('username');
        this.username = null;
        this.$router.replace('/login');
      }).catch(function(error) {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
#logo {
  width: 70%;
}
</style>
