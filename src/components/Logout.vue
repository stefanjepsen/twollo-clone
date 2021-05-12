<template>
  <q-btn v-if="isLoggedIn"  color="purple" @click="Logout" label="Log out"> </q-btn>
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
        name.value = user.email.split("@")[0]
      }
    })

 

    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("Signed out"))
        .catch((err) => alert(err.message));
    };
       const isLoggedIn = () => {
         logout()
    }
    return { name, Logout, isLoggedIn  };
  },
};
</script>

<style>
</style>