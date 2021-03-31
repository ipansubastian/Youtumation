<template>
  <div id="menu">
    <button class="menu-btn border-b w-full" @click="toDashboard">Main Dashboard</button>
    <button class="menu-btn border-b w-full" @click="toPreferences">Preferences</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '../scripts/store';
export default {
  computed: {
    ...mapGetters(['currentSBComponent']),
    currentSBComponent: {
      set(newComponent) {
        store.dispatch('setCurrentSBComponent', newComponent);
      },
    },
  },
  methods: {
    toDashboard() {
      this.currentSBComponent = 'MainDashboard';
    },
    toPrefereneces() {
      this.currentSBComponent = 'Prefereces';
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-btn {
  height: 73px;
  display: block;
}
#menu {
  height: 73px * 2;
  // border: 1px solid yellow;
  overflow: hidden;
}
</style>
