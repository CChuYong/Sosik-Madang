<template>
  <main-map id="map" />

  <shop-list-flyout id="shop-list-flyout" :show="$store.state.shopListFlyoutShown" />
  <page-map-controls id="map-controls" />
</template>

<script>
import MainMap from "@/components/MainMap.vue";
import PageMapControls from "@/components/PageMapControls.vue";
import ShopListFlyout from "@/components/ShopListFlyout.vue";

export default {
  name: "HomePage",
  components: {
    MainMap,
    PageMapControls,
    ShopListFlyout,
  },
  data() {
    return {
      shopListFlyoutShown: false,
    };
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;

  //temp
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lighten($body-background-color, 20%);
}

#map-controls {
  position: fixed;
  left: 1rem;
  top: $navbar-height + ($navbar-inner-padding-v * 2) + 1rem;
}
</style>
