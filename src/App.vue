<template>
  <div>
    <Navbar></Navbar>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
  import firebase from 'firebase';
  import Navbar from "./components/NavBar";
  //import $ from 'jquery'

  export default {
    components: {Navbar},
    data() {
      return {
        username : ''
      }
    },
    methods: {
      notLogged: function () {
        if (firebase.auth().currentUser ) {
          console.log("logged in");
          this.username = localStorage.getItem('username')
          return false;
        }
        return true;
      }
    },
    mounted() {
      this.notLogged();

    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
