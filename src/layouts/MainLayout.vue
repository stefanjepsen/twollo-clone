<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">{{ $route.name }}</span>

          <logout  />

          <q-icon
            class="q-pa-md lt-md header-icon"
            name="fas fa-dove"
            size="sm"
            color="#fff"
          />
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :width="280" side="left" elevated>
      <!-- drawer content -->
      <q-icon class="q-pa-md" name="fas fa-dove" size="lg" color="primary" />
      <q-list>
        <q-item to="/" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="home" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
        </q-item>
        <q-item to="/about" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="help" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold"
            >About</q-item-section
          >
        </q-item>

        <q-item to="/login" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="login" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold"
            >Login</q-item-section
          >
        </q-item>

        <q-item to="/register" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="how_to_reg" size="sm" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold"
            >Register</q-item-section
          >
        </q-item>
                <q-item to="/test" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="how_to_reg" size="sm" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold"
            >Test</q-item-section
          >
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay elevated>
      <!-- drawer content -->
      <q-input placeholder="Search" class="q-ma-md" rounded outlined dense>
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list padding separator>
        <q-item class="q-pa-md" exact>
          <q-item-section>
            <q-item-label class="text-grey" overline>OVERLINE</q-item-label>
            <q-item-label class="text-weight-bold"
              >Single line item</q-item-label
            >
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- Keep alive lader vores sider køre i baggrunden når vi skifter views, så der ikke refreshes mellem skift. 
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
      -->

      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import Logout from "src/components/Logout.vue";

export default {
  components: { Logout },
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
};
</script>

<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
</style>