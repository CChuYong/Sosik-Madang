<template>
  <main-map id="map" />

  <page-map-controls id="map-controls" />
</template>

<script>
import MainMap from "@/components/MainMap.vue";
import PageMapControls from "@/components/PageMapControls.vue";

export default {
  name: "HomePage",
  components: {
    MainMap,
    PageMapControls,
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}

#map-controls {
  position: fixed;
  left: 1rem;
  top: $navbar-height + ($navbar-inner-padding-v * 2) + 1rem;
}
</style>
