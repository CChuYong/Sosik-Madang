<template>
  <nav id="nav" :class="{ 'before-mount': !isMounted }">
    <span class="title"><strong>소</strong><span style="font-size: 0.95em">食</span><strong>마</strong><span>당</span></span>
  </nav>
</template>

<script>
export default {
  "name": "NavigationBar",
  data() {
    return {
      isMounted: false,
    };
  },
  mounted() {
    // TRANSITION
    this.$nextTick(() => {
      setTimeout(() => { this.isMounted = true; }, 100);
    });
  },
};
</script>

<style lang="scss">
#nav {
  display: flex;
  align-items: center;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: $navbar-height;
  padding: $navbar-inner-padding-v $navbar-inner-padding-h;

  background-color: rgba($body-background-color, 0.5);
  box-shadow: 0 0.05rem 0.66rem rgba($body-background-color, 0.5);
  backdrop-filter: blur(0.25rem);

  transition: background-color 0.5s;

  .title {
    display: flex;
    align-items: center;

    font-size: 2em;
    font-weight: 100;

    strong { font-weight: 700; }

    * { transition: transform 1s cubic-bezier(0, 0, 0, 1), opacity 1s cubic-bezier(0, 0, 0, 1); }
    *:nth-child(even) { transform: translateY(0.2em); }
    *:nth-child(odd) { transform: translateY(-0.2em); }
  }

  &.before-mount {
    .title {
      * {
        transform: translateY(0);
        opacity: 0;
      }
    }
  }
}
</style>
