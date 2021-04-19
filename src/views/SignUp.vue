<template>
  <b-container>
    <b-row>
      <b-col class="pt-5">
        <h3 class="pb-3 text-center">Sign Up</h3>
        <h5 class="text-center">Let's create your account !!</h5>

        <b-form  @submit.stop.prevent>
          <b-form-group label="Email address:">
            <b-form-input v-model="email" type="email" required />
          </b-form-group>

          <b-form-group label="Password:">
            <b-form-input type="password" v-model="password" required/>
          </b-form-group>

          <b-form-group class="text-center">
            <b-button variant="success" @click="signUp">SignUp</b-button>
            <span> or go back to <router-link to="/login">login</router-link>.</span>
          </b-form-group>
        </b-form>

      </b-col>
    </b-row>
  </b-container>

</template>

<script>
    import firebase from 'firebase';
    export default {
        name: 'signUp',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            signUp: function() {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        console.log("user", user);
                        this.username = user.user.email;
                        localStorage.setItem("username", this.username);
                        this.$router.replace('/');
                    },
                    (err) => {
                        alert('Oops. ' + err.message)
                    }
                );
            }
        }
    }
</script>

<style scoped>
</style>
