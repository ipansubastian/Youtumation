<template>
  <div class="grid grid-cols-6">
    <aside class="cols-span-1 md:cols-span-2 sm:cols-span-2 h-screen relative" ref="sidebar">
      <div class="w-full h-full bg-sidebar-bg absolute sidebar-bg"></div>
      <div class="w-full h-full bg-red-600 bg-opacity-70 absolute">
        <h3 class="text-white-500 float-left">Youtumation</h3>
        <div
          class="h-52 bg-gray-500 resize bg- float-right w-1 rounded-bl-xl"
          ref="separator"
          @mousedown="startResize"
          @mouseup="stopResize"
        ></div>
      </div>
    </aside>
    <div class="cols-span-5 md:cols-span-4 sm:cols-span-4"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resizeState: false,
      SBInitialWidth: null,
    };
  },
  methods: {
    startResize() {
      this.resizeState = true;
    },
    stopResize() {
      this.resizeState = false;
    },
    resize(event) {
      if (this.resizeState) {
        const sidebar = this.$refs.sidebar;
        const separator = this.$refs.separator;

        const { x: sidebarX } = sidebar.getClientRects()[0];
        const { width: separatorWidth } = separator.getClientRects()[0];

        const widthCandidate = event.clientX - sidebarX + separatorWidth / 2;

        if (widthCandidate >= this.SBInitialWidth && widthCandidate < window.innerWidth / 4) {
          sidebar.style.width = `${widthCandidate}px`;
        } else {
          console.log('Sidebar hidden');
        }
        // console.log(getComputedStyle(sidebar).width);
        // console.log(x);
        // console.log(sidebar.getBoundingClientRect());
        // console.log(event);
      }
    },
  },
  mounted() {
    this.SBInitialWidth = this.$refs.sidebar.getClientRects()[0].width;
    document.addEventListener('mousemove', this.resize);
    document.addEventListener('mouseup', this.stopResize);
  },
};
</script>

<style lang="scss">
$sdBgPos: -400px;

.sidebar-bg {
  background-position-x: $sdBgPos;
  // background-size: contain;
  // background-size: ;
  // background-color: ;
  // background-size: 100% 100%;
  // background-blend-mode: color;
}

.resize:hover {
  // cursor: e-resize;
  cursor: ew-resize;
}

h3::selection {
  // background: transparent;
  // color: black;
  user-select: none;
}
</style>
