<template>
  <q-page class="flex flex-center">

<p>My name is {{ name }} and im {{ age }}'s old' </p>
  <q-btn @click="handleClick">Tryk</q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TestPage',
  setup() {
    console.log('setup')

    let name = 'stefan'
    let age = 30

    const handleClick = () => {
      console.log('you clicked me');
    }

    return { name, age, handleClick }

  }
})
</script>
