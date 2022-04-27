<template>
  <navigation-bar />

  <main-map />

  <div id="router-content">
    <router-view />
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import MainMap from "@/components/MainMap.vue";

export default {
  "name": "App",
  "components": {
    NavigationBar,
    MainMap,
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
