<template>
  <q-page class="q-pa-lg">
    <h4 class="q-mt-none q-mb-md text-weight-bold">Register</h4>
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit.prevent="Register" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="email"
          label="Your Email *"
          hint="Email"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please enter valid Email',
          ]"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Your Password *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Must be a valid password',
            (val) => (val && val.length > 8) || 'Must be atleast 8 chars',
          ]"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" value="Register" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
      <br />
      <h5>Have an account? <router-link to="/login">Login her </router-link></h5>
    </div>
    

    
  </q-page>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";

export default {
  setup() {
    const email = ref("")
    const password = ref("")

    const Register = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(user => {
          alert(user)
        })
        .catch(err => alert(err.message))
    }

    function onReset() {
      email.value = null
      password.value = null
    }
    return {  Register, email, password, onReset }
  },
};
</script>

<style>
</style>