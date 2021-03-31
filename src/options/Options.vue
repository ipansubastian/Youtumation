<template>
  <div>
    <div class="grid grid-cols-6">
      <aside class="cols-span-1 md:cols-span-2 sm:cols-span-2 h-screen relative bg-sidebar-bg sidebar-bg" ref="sidebar">
        <!-- <div class="w-full h-full bg-sidebar-bg absolute sidebar-bg"></div> -->
        <div class="w-full h-full absolute bg-red-600 bg-opacity-70">
          <h3
            class="h-14 align-middle flex items-center pl-5 w-full border-gray-100 border-b text-white-500 flot-left text-white text-2xl bg-opacity-75 cursor-pointer"
            @click="home"
          >
            Youtumation
          </h3>
          <div
            class="h-52 bg-gray-500 resize float-right w-1 translate-x-full -translate-y-16 transform rounded-br-xl"
            ref="separator"
            @mousedown="startResize"
            @mouseup="stopResize"
          ></div>
          <component :is="currentSBComponent"></component>
        </div>
      </aside>
      <div class="cols-span-5 md:cols-span-4 sm:cols-span-4"></div>
    </div>
    <!-- Virtual Template  -->
    <template>
      <div class="invisible">
        <div class="grid grid-cols-6" ref="vContainer">
          <aside class="cols-span-1 md:cols-span-2 sm:cols-span-2 h-0 relative" ref="vSidebar">
            <!-- <div class="w-full h-full bg-sidebar-bg absolute sidebar-bg"></div>
          <div class="w-full h-full bg-red-600 bg-opacity-70 absolute">
            <h3 class="text-white-500 float-left">Youtumation</h3>
            <div class="h-52 bg-gray-500 resize bg- float-right w-1 rounded-bl-xl" ref="vSeparator"></div>
          </div> -->
          </aside>
          <div class="cols-span-5 md:cols-span-4 sm:cols-span-4" ref="vMain"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// import func from 'vue-editor-bridge';
// import sidebarMenu from './components/SidebarMenu';
import MainMenu from './components/MainMenu';
import MainDashboard from './components/MainDashboard';
import { mapGetters } from 'vuex';
import store from './scripts/store';

export default {
  data() {
    return {
      resizeState: false,
      vSidebarWidth: null,
      isInitialWidth: true,
      lastEventX: null,
      // currentComponent: 'MainMenu',
      // currentMenu: 'mainDashboard',
      // isNotInitialWidth: false,
      // sidebar: this.$refs.sidebar
    };
  },
  computed: {
    ...mapGetters(['currentSBComponent']),
  },
  components: {
    // sidebarMenu,
    MainMenu,
    MainDashboard,
  },
  methods: {
    initSidebarWidth() {
      this.isInitialWidth = true;
      // this.isNotInitialWidth = false;
      return getComputedStyle(this.$refs.vSidebar).width;
    },
    startResize() {
      this.resizeState = true;
    },
    stopResize() {
      this.resizeState = false;
    },
    resizeHanlder() {
      const vSidebarWidth = getComputedStyle(this.$refs.vSidebar).width.replace('px', '');
      this.vSidebarWidth = getComputedStyle(this.$refs.vSidebar).width.replace('px', '');
      // console.log(this.vSidebarWidth);
      // console.log(this.isInitialWidth);
      if (this.isInitialWidth) {
        this.$refs.sidebar.style.width = this.vSidebarWidth + 'px';
      } else {
        if (this.lastEventX > window.innerWidth / 3) {
          this.$refs.sidebar.style.width = window.innerWidth / 3 + 'px';
        } else if (this.lastEventX < vSidebarWidth) {
          this.$refs.sidebar.style.width = vSidebarWidth + 'px';
          // console.log(this.)
        } else {
          this.$refs.sidebar.style.width = this.lastEventX + 'px';
        }
      }
    },
    resize(event) {
      // alert('ya');
      // console.log(this.vSidebarWidth + 'px');
      if (this.resizeState) {
        const sidebar = this.$refs.sidebar;
        const separator = this.$refs.separator;
        const { x: sidebarX } = sidebar.getClientRects()[0];
        const { width: separatorWidth } = separator.getClientRects()[0];
        const widthCandidate = event.clientX - sidebarX + separatorWidth / 2;
        const SBMaxWidth = window.innerWidth / 3;
        const gThanMinWidth = widthCandidate >= this.vSidebarWidth;
        const lThanMinWidth = widthCandidate < this.vSidebarWidth;
        const gThanMaxWidth = widthCandidate > SBMaxWidth;
        const lThanMaxWidth = widthCandidate < SBMaxWidth;

        if (gThanMinWidth && lThanMaxWidth) {
          this.isInitialWidth = false;
          this.lastEventX = widthCandidate;
          // this.isNotInitialWidth = false;
          sidebar.style.width = widthCandidate + 'px';
        } else if (lThanMinWidth) {
          // console.log('sb width:',this.vSidebarWidth);
          // console.log('x:', event)
          sidebar.style.width = this.initSidebarWidth();
        } else if (gThanMaxWidth) {
          this.isInitialWidth = false;
          // this.isNotInitialWidth = true;
          this.lastEventX = SBMaxWidth;
          sidebar.style.width = SBMaxWidth + 'px';
        }
      }
    },
    home() {
      store.dispatch('setCurrentSBComponent', 'MainMenu');
    },
    // initBaseWidthNode() {
    //   const vContainer = document.createElement('div');
    //   const containerStylesheet = `
    //     display: grid;
    //     grid-template-columns: repeat(6, minmax(0, 1fr));
    //   `;
    //   vContainer.setAttribute('style', containerStylesheet);

    //   const vSidebar = document.createElement('aside');
    //   const sidebarStylesheet = `
    //     grid-column: span 1 / span 1;
    //   `;
    //   vSidebar.setAttribute('style', sidebarStylesheet);

    //   const vMain = document.createElement('div');
    //   const mainStylesheet = `
    //   `;
    // },
  },
  mounted() {
    this.vSidebarWidth = this.initSidebarWidth().replace('px', '');
    window.addEventListener('resize', this.resizeHanlder);
    document.addEventListener('mousemove', this.resize);
    document.addEventListener('mouseup', this.stopResize);
    window.sidebar = this.$refs.sidebar;
    window.sidebarW = this.$refs.sidebar.getClientRects()[0].width;
  },
};
</script>

<style lang="scss">
$sdBgPos: -400px;
.sidebar-bg {
  background-position-x: $sdBgPos;
}
.resize:hover {
  cursor: ew-resize;
}
h3::selection {
  user-select: none;
}
</style>
