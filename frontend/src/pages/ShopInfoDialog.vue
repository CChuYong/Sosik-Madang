<template>
  <div class="dialog">
    <div class="dialog-inner">
      DIALOG HERE!

      <a @click="$router.back()">닫기</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopInfoDialog",
};
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
  color: currentColor;
  text-decoration: none;
}

.dialog {
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999999;

  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);

  &-inner {
    position: relative;
  }
}
</style>
