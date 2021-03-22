<template>
  <div class="main grid grid-rows-3bak gap-4">
    <header class="bg-gray-50 pt-4 pb-3 pl-3 pr-3">
      <h2 class="text-black-200 ml-2 text-sm">Youtumation <span class="text-gray-400">1.0.0</span></h2>
    </header>

    <transition name="fade" mode="out-in">
      <component :is="currentComponent" class="popup-container"></component>
    </transition>

    <footer class="pt-1 pb-1 pl-3 pr-3">
      <p class="text-gray-400 text-center">
        Youtumation v1.0.0 by
        <a class="underline cursor-pointer" title="Ipan Subastian | Github" @click="createTab({url: authorGHURL})">Ipan Subastian</a>
      </p>
    </footer>
  </div>
</template>

<script>
import Main from './components/Main';
import About from './components/About';
export default {
  data() {
    return {
      currentComponent: 'Main',
      authorGHURL: 'https://github.com/ipansubastian',
    };
  },
  components: {
    Main,
    About,
  },
  methods: {
    createTab(params) {
      const defaultParams = {
        // add default params here
      };
      params = Object.assign(defaultParams, params);
      chrome.tabs.create({ active: params.active, url: params.url });
    },
  },
};
</script>

<style scoped>
.popup-container {
  width: 300px;
  /* height: 400px;  */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active
below version 2.1.8 */ {
  opacity: 0;
}
</style>
