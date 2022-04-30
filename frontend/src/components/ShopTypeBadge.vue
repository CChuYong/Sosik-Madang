<template>
  <div v-show="type.length > 0"
       class="type-badge"
       :style="{ backgroundColor: getShopTypeBackgroundColor(type) }">
    {{ type }}
  </div>
</template>

<script>
export default {
  name: "ShopTypeBadge",
  props: {
    type: String,
  },
  methods: {
    getShopTypeBackgroundColor(type) {
      // Assume `type` is an ordinal type name (shopTypes.typeName)
      const foundType = this.$store.state.shopTypes.find((x) => x.typeName === type);

      if(foundType) {
        return foundType.backgroundColor;
      } else {
        return "#000";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.type-badge {
  display: inline-block;
  padding: 0.25em 0.5em;
  margin-right: 0.75em;
  color: $body-foreground-color;
  border-radius: 0.25em;
}
</style>
