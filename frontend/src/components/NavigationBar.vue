<template>
  <nav id="nav">

  </nav>
</template>

<script>
export default {
  "name": "NavigationBar",
};
</script>

<style lang="scss">
#nav {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: $navbar-height;
  padding: $navbar-inner-padding;
}
</style>
