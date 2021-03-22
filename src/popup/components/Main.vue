<template>
  <div class="">
    <p
      class="cursor-pointer text-xs hover:bg-red-700 hover:text-white hover:text-bold pl-3 pr-3 pt-2 pb-2 w-full inline-block "
      @click="openOptionsPage"
    >
      <fa-icon icon="tachometer-alt" class="ml-2"></fa-icon>
      <span class="ml-1">Buka Dasbor</span>
    </p>
    <p
      class="cursor-pointer text-xs hover:bg-red-700 hover:text-white hover:text-bold pl-3 pr-3 pt-2 pb-2 w-full inline-block "
    >
      <fa-icon icon="sliders-h" class="ml-2"></fa-icon>
      <span class="ml-1">Preferensi</span>
    </p>
    <p
      class="cursor-pointer text-xs hover:bg-red-700 hover:text-white hover:text-bold pl-3 pr-3 pt-2 pb-2 w-full inline-block "
      @click="setPopupComponent('About')"
    >
      <fa-icon icon="info-circle" class="ml-2"></fa-icon>
      <span class="ml-1">Tentang</span>
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    setPopupComponent(name) {
      this.$parent.currentComponent = name;
      return true;
    },
    openOptionsPage: () => chrome.runtime.openOptionsPage(),
  },
};
</script>
