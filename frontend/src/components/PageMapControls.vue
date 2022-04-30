<template>
  <div id="map-controls">
    <div class="control-container">
      <div class="title">식당 분류</div>

      <div class="toggle-button-container">
        <span v-for="type in $store.state.shopTypes"
              :key="type.slug"
              class="button toggle"
              :class="{ active: type.filterActivated }"
              :style="{ backgroundColor: type.backgroundColor }"
              @click="() => { type.filterActivated = !type.filterActivated; }">
          {{ type.typeName }}
        </span>
      </div>
    </div>

    <div class="control-container">
      <div class="title">필터 옵션</div>

      <div>
        <span class="check-toggle"
              :class="{ checked: filterOptions.filterRatingAbove4 }"
              @click="filterOptions.filterRatingAbove4 = !filterOptions.filterRatingAbove4">
          <span class="mark">{{ filterOptions.filterRatingAbove4 ? "☑" : "☐" }}</span>
          <span>별점 4점 이상</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageMapControls",
  data: () => {
    return {
      filterOptions: {
        filterRatingAbove4: false,
      },
    };
  },
  watch: {
    shopTypes: {
      deep: true,
      handler() { this.updateMap(); },
    },
    filterOptions() { this.updateMap(); },
  },
  methods: {
    getActivatedShopTypes() {
      return this.shopTypes.filter((x) => x.filterActivated).map((x) => x.slug);
    },
    updateMap() {
      console.log("map update");
      // TODO
    },
  },
};
</script>

<style lang="scss" scoped>
#map-controls {
  display: flex;
  flex-direction: column;

  width: 12rem;
  padding: 1rem;
  color: $body-background-color;
  background-color: rgba($body-foreground-color, 0.75);
  backdrop-filter: blur(0.5rem);
  box-shadow: 0 0.33rem 1rem rgba($body-background-color, 0.33);
  border-radius: 0.5em;
  z-index: 10;

  .control-container {
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;

    &:first-child { margin-top: 0; }

    .title {
      text-align: center;
      font-size: 1.25em;
      font-weight: 700;
      margin-bottom: 0.75rem;
    }

    .button {
      cursor: pointer;
      color: $body-foreground-color;
      border-radius: 0.33rem;
      opacity: 0.5;
      transition: opacity 0.33s, box-shadow 0.33s;

      &.active {
        opacity: 1;
        box-shadow: 0 0.15rem 0.33rem rgba($body-background-color, 0.5);
      }
    }

    .toggle-button-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;

      & > .button {
        text-align: center;
        width: calc(50% - 1.5rem);
        padding: 0.45rem;
        margin: 0.3rem;
      }
    }

    .check-toggle {
      position: relative;
      cursor: pointer;
      padding: 0.15em 0.15em;
      transition: color 0.33s, padding 0.33s $ease-out-bezier;

      .mark {
        font-weight: 900;
        margin-right: 0.5em;
      }

      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 0;
        background-color: rgba($body-background-color, 0.5);
        border-radius: 0.25em;
        z-index: -1;

        transition: background-color 0.33s, height 0.33s $ease-out-bezier;
      }

      &:hover, &.checked {
        color: $body-foreground-color;
        padding: 0.15em 0.5em;

        &::before {
          height: 100%;
        }
      }

      &.checked::before {
        background-color: rgba($body-background-color, 0.8) !important;
      }
    }
  }
}
</style>
