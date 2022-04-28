<template>
  <nav id="nav" :class="{ 'before-mount': !isMounted }">
    <div class="nav-title">
      <img class="logo" src="@/assets/icons/logo.svg" />
      <span class="title"><strong style="color: #A3C4E9">소</strong><span style="font-size: 0.95em">食</span><strong style="color: #A3C4E9">마</strong><span>당</span></span>
    </div>

    <div class="nav-icons" title="전체 맛집 목록 보기" @click="showAllShopsClick">
      <img class="icon" src="@/assets/icons/mdi-format-list-text-white.svg" />
      <span class="text">전체 맛집 목록 보기</span>
    </div>
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
  methods: {
    showAllShopsClick() {
      this.$store.commit("shopListFlyoutShown", !this.$store.state.shopListFlyoutShown);
    },
  },
  mounted() {
    // TRANSITION
    this.$nextTick(() => {
      setTimeout(() => { this.isMounted = true; }, 100);
    });
  },
};
</script>

<style lang="scss" scoped>
#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: $navbar-height;
  padding: $navbar-inner-padding-v $navbar-inner-padding-h;
  z-index: 99999;

  background-color: rgba($body-background-color, 0.75);
  box-shadow: 0 0.05rem 0.66rem rgba($body-background-color, 0.5);
  backdrop-filter: blur(0.25rem);

  transition: background-color 0.5s;

  @media screen and (max-width: 450px) {
    padding: $navbar-inner-padding-v $navbar-inner-padding-h-smallscreen;
  }

  .nav-title {
    display: flex;
    align-items: center;
    height: 100%;

    .logo {
      width: $navbar-height;
      height: $navbar-height;
      margin-right: 1em;
    }

    .title {
      display: flex;
      align-items: center;

      font-size: 2em;
      font-weight: 100;

      strong { font-weight: 700; }

      * { transition: transform 1s $ease-out-bezier, opacity 1s $ease-out-bezier; }
      *:nth-child(even) { transform: translateY(0.2em); }
      *:nth-child(odd) { transform: translateY(-0.2em); }
    }
  }

  .nav-icons {
    display: flex;
    align-items: center;

    height: 2em;
    padding: 0.5em 0.75em;
    border-radius: 2em;
    cursor: pointer;
    user-select: none;

    transition: background-color 0.33s $ease-out-bezier,
                box-shadow 0.33s $ease-out-bezier,
                transform 0.33s $ease-out-bezier;

    @media screen and (max-width: 700px) {
      padding: 0.5em;

      .text {
        display: none;
      }
    }

    .icon {
      width: 2em;
      height: 2em;
    }

    .text {
      margin-left: 0.5em;
    }

    &:hover, &:active {
      background-color: rgba($body-foreground-color, 0.25);
      box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.25);
      transform: scale(1.025);
    }

    &:active {
      transform: scale(0.975) !important;
    }
  }

  &.before-mount {
    .nav-title {
      .title {
        * {
          transform: translateY(0);
          opacity: 0;
        }
      }
    }
  }
}
</style>
