<template>
  <div class="flyout" :class="{ shown: show }">
    <ul>
      <li v-for="shop in $store.state.shopListAll"
          :key="shop.id">
        {{ shop.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ShopListFlyout",
  props: {
    show: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.flyout {
  position: fixed;
  right: -3rem;
  top: -3rem;
  bottom: -3rem;
  padding: calc(3rem + $navbar-height + ($navbar-inner-padding-v * 2)) 3rem 3rem 0;
  width: 25vw;
  min-width: 20rem;
  z-index: 10000;

  color: $body-background-color;
  background-color: $body-foreground-color;
  box-shadow: inset 0 0 3rem rgba($body-background-color, 0.75);
  backdrop-filter: blur(0.5rem);

  transform: translateX(100%);
  transition: transform 0.5s $ease-out-bezier;

  &.shown {
    transform: none;
  }
}
</style>
