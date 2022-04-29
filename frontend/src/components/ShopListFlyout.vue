<template>
  <div class="flyout" :class="{ shown: show }">
    <ul class="shop-list-parent">
      <li v-for="shop in $store.state.shopListAll"
          :key="shop.id"
          class="shop-list-item"
          @click="shopItemClick(shop)">
        <div class="name">{{ shop.name }}</div>
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
  methods: {
    shopItemClick(shopItem) {
      this.$router.push(`/info/${shopItem.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.flyout {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
  padding-top: $navbar-height + ($navbar-inner-padding-v * 2);
  width: 25rem;
  max-width: 100%;
  z-index: 10000;

  color: $body-background-color;
  background-color: rgba($body-foreground-color, 0.85);
  backdrop-filter: blur(0.5rem);
  box-shadow: 0 0 2rem rgba($body-background-color, 0.5);

  transform: translateX(120%);
  transition: transform 0.5s $ease-out-bezier;

  &::-webkit-scrollbar {
    width: 0.33rem;
    background: $body-foreground-color;
  }
  &::-webkit-scrollbar-thumb {
    background: $body-background-color;
  }

  &.shown {
    transform: none;
  }

  ul.shop-list-parent {
    /* STYLE NORMALIZATION */
    list-style: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;
    /* === */

    margin-top: 1rem;

    li.shop-list-item {
      cursor: pointer;
      padding: 1rem 1rem 1rem 3rem;
      transition: background-color 0.15s;

      &:hover {
        background-color: rgba($body-accent-color, 0.75);
      }

      .name {
        font-size: 2em;
        font-weight: 700;
      }
    }
  }
}
</style>
