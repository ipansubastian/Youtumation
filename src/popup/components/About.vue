<template>
  <div class="pl-5 pr-5">
    <back-button :callback="back"></back-button>
    <div class="mt-2">
      <header>
        <h2 class="font-bold text-lg text-center">Youtumation 1.0.0</h2>
      </header>
      <article class="mt-1 text-center">
        <p>
          Youtumation merupakan tool yang dapat mengotomasi kegiatan anda saat menonton Video di Youtube.
        </p>
        <div class="mt-4">
          <h3 class="font-bold">Repositori Proyek:</h3>
          <p class="bg-yellow-100 pl-1 pr-1 pt-2 pb-2 break-words text-left mt-1">
            <a class="underline cursor-pointer" @click="createTab({ url: repository })">
              https://github.com/ipansubastian/Youtumation
            </a>
          </p>
        </div>
        <div class="mt-4">
          <h3 class="font-bold">Pengembang:</h3>
          <p>Ipan Subastian</p>
          <div class="grid grid-cols-2 mt-2">
            <a class="cursor-pointer" @click="createTab({ url: authorGHURL })">
              <img src="../../assets/github_icon.png" class="float-right ml-2" />
            </a>
            <a class="cursor-pointer" @click="createTab({ url: authorFBURL })">
              <img src="../../assets/facebook_icon.png" class="float-left ml-2" />
            </a>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import BackButton from './_backButton';
export default {
  data() {
    return {
      repository: 'https://github.com/ipansubastian/Youtumation',
      authorGHURL: 'https://github.com/ipansubastian',
      authorFBURL: 'https://web.facebook.com/outside.jp',
    };
  },
  components: {
    BackButton,
  },
  methods: {
    back() {
      this.$parent.currentComponent = 'Main';
    },
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
img {
  width: 50px;
}
</style>
