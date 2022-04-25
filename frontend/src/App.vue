<template>
  <navigation-bar />

  <router-view />
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  "name": "App",
  "components": {
    NavigationBar,
  },
};
</script>

<style lang="scss">
</style>
