<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <div class="row">
        <p>My name is {{ name }} and im {{ age }}'s old'</p>
        <q-btn @click="handleClick">Tryk</q-btn>
        <q-input v-model="text" label="Standard" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TestPage",
  setup() {
    // const para = ref(null)

    const name = ref("stefan");
    const age = ref(30);

    const handleClick = () => {
      // console.log(para, para.value)
      // para.value.classList.add('test')
      // para.value.textContent = "Dette ændrede sig"
      name.value = "John";
      age.value = 27;
    };

    return { name, age, handleClick };
  },
});
</script>
