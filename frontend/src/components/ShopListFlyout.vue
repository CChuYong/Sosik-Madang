<template>
  <div class="flyout" :class="{ shown: show }">
    <ul class="shop-list-parent">
      <li v-for="shop in $store.state.shopListAll"
          :key="shop.id"
          class="shop-list-item"
          @click="shopItemClick(shop)">
        <div class="name">{{ shop.name }}</div>
        <div class="rating-reviews">
          <div class="type"
               :style="{ backgroundColor: getShopTypeBackgroundColor(shop.type) }">{{ shop.type }}</div>
          <star-rating :read-only="true"
                       :rating="shop.rating"
                       :show-rating="false"
                       :star-size="24"
                       :increment="0.5" />
          <span class="review-count">({{ shop.reviewCount }})</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  name: "ShopListFlyout",
  components: {
    StarRating,
  },
  props: {
    show: Boolean,
  },
  methods: {
    shopItemClick(shopItem) {
      this.$router.push(`/info/${shopItem.id}`);
    },
    getShopTypeBackgroundColor(type) {
      // Assume `type` is an ordinal type name (shopTypes.typeName)

      return this.$store.state.shopTypes.find((x) => x.typeName === type).backgroundColor;
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
      padding: 1rem 1rem 1rem 2rem;
      transition: background-color 0.15s, padding-left 0.15s $ease-out-bezier;

      &:hover {
        background-color: rgba($body-accent-color, 0.75);
        padding-left: 2.5rem;
      }

      .name {
        font-size: 1.66em;
        font-weight: 700;
        margin-bottom: 0.33em;
      }

      .rating-reviews {
        display: flex;
        align-items: center;

        .type {
          padding: 0.25em 0.5em;
          margin-right: 0.75em;
          color: $body-foreground-color;
          border-radius: 0.25em;
        }

        .review-count {
          margin-left: 0.25em;
        }
      }
    }
  }
}
</style>
