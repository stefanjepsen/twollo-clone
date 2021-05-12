<template>
  <h3>Welcome {{ name }}</h3>
  <router-link to="/about"></router-link>
  <br>
  <button @click="Logout">Log Ud</button>
</template>


<script>
import { ref, onBeforeMount } from "vue";
import firebase from "firebase";
export default {
  setup() {
    const name = ref("");
    onBeforeMount(() => {
      const user = firebase.auth().currentUser
      if (user) {
        name.value = user.email.split("@")[0];
      }
    });
    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("Signed out"))
        .catch((err) => alert(err.message));
    };
    return { name, Logout };
  },
};
</script>

<style>
</style>