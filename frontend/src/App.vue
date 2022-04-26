<template>
  <navigation-bar />

  <div id="map"></div>

  <div id="router-content">
    <router-view />
  </div>
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

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
