<template>
  <q-page class="">
    <div class="row">
      <div class="q-px-md q-pt-md flex">
        <div class="row">
          <p>My name is {{ name }} and im {{ age }}'s old'</p>
        </div>
        <div class="row">
          <q-btn @click="handleClick">Tryk</q-btn>
          <q-btn @click="age++">INcrease</q-btn>
          <q-btn @click="age--">Decrease</q-btn>
        </div>

        <q-input type="text" v-model="name" label="Standard" />
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
