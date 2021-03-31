<template>
  <vsa-list>
    <vsa-item v-for="[key, menu] of menus.entries()" :key="key" class="w-full border-0">
      <vsa-heading class="bg-green-500 bg-opacity-10">
        <fa-icon :icon="menu.icon"></fa-icon>
        <span>{{ menu.title }}</span>
      </vsa-heading>
      <vsa-content>
        Ya
      </vsa-content>
    </vsa-item>
  </vsa-list>
  <!-- <vsa-list> </vsa-list> -->
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          icon: 'tasks',
          title: 'Tasks',
        },
        {
          icon: 'tasks',
          title: 'Alarms',
        },
        { icon: 'tasks', title: 'Screenshots' },
        { icon: 'tasks', title: 'History' },
        { icon: 'tasks', title: 'Sounds' },
        { icon: 'tasks', title: 'Playlist' },
        { icon: 'tasks', title: 'Youtube Elements' },
      ],
    };
  },
};
</script>
