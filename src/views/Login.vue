<template>
  <b-container>
    <b-row>
      <b-col class="pt-5">
        <h3 class="pb-3 text-center">Sign In</h3>

        <b-form  @submit.stop.prevent>
          <b-form-group label="Email address:">
            <b-form-input v-model="email" type="email" required />
          </b-form-group>

          <b-form-group label="Password:">
            <b-form-input type="password" v-model="password" required/>
          </b-form-group>

          <b-form-group class="text-center">
            <b-button variant="success" @click="login">Login</b-button>
          </b-form-group>
          <b-form-group class="text-center">
            <p>Don't have an account ? You can <router-link to="/signup">create one by Github </router-link></p>
            <b-button class="social-button" @click="socialGithubLogin"><img src="/assets/github_logo.png"></b-button>
          </b-form-group>
        </b-form>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
    import firebase from 'firebase';
    import {saveUser} from "@/helpers";

    import {API_BASE_URL} from "../config";
    export default {
        name: 'login',
        data() {
            return {
                email: '',
                password: '',
                username: ''
            }
        },
        methods: {
          //Logged in using email id and password
          login: function () {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                  this.username = user.user.email;
                  localStorage.setItem("username", this.username);
                  firebase.auth().currentUser.getIdToken(true).then((idToken) => {
                    localStorage.setItem("idToken", idToken);
                    const token = "Bearer " + idToken
                    const url = `${API_BASE_URL}private/saveUser`;
                    saveUser(url, token);
                  })
                  this.$router.replace('/');
                },
                (err) => {
                  alert('Oops. ' + err.message)
                }
            );
          },

          socialGithubLogin() {
            //Logged in using GitHub
            const provider = new firebase.auth.GithubAuthProvider();

            firebase.auth().signInWithPopup(provider).then((result) => {
              console.log("result", result);
              this.username = firebase.auth().currentUser.email;
              localStorage.setItem("username",this.username);
              firebase.auth().currentUser.getIdToken(true).then((idToken) => {
                localStorage.setItem("idToken", idToken);
                const token = "Bearer " + idToken
                const url = `${API_BASE_URL}private/saveUser`;
                saveUser(url, token);
              })
              this.$router.replace('/');
            }).catch((err) => {
              alert('Oops. ' + err.message)
            })
          }
        }

    }

</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */

.social-button {
    width: 75px;
    background: white;
    padding: 10px;
    border-radius: 100%;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    outline: 0;
    border: 0;
}
.social-button:active {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
}
.social-button img {
    width: 100%;
}
</style>
