<template>
  <div>
    <p class="text-gray-400 text-sm cursor-pointer" @click="callback">
      <small> <fa-icon icon="arrow-left"></fa-icon> <span class="ml-1">Back</span> </small>
    </p>
  </div>
</template>

<script>
export default {
  props: ['callback'],
};
</script>
