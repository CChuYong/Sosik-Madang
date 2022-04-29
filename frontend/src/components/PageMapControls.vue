<template>
  <div id="map-controls">
    <div class="control-container">
      <div class="title">식당 분류</div>

      <div class="toggle-button-container">
        <span v-for="type in shopTypes"
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
import randomColor from "randomcolor";

function getButtonRandomColor(hue) {
  return randomColor({
    hue,
    luminosity: "dark",
    alpha: 0.75,
    format: "rgba",
  });
}

export default {
  name: "PageMapControls",
  data: () => {
    return {
      shopTypes: [
        {
          "slug": "korean",
          "typeName": "한식",
          "backgroundColor": getButtonRandomColor("blue"),
          "filterActivated": false,
        },
        {
          "slug": "japanese",
          "typeName": "일식",
          "backgroundColor": getButtonRandomColor("red"),
          "filterActivated": false,
        },
        {
          "slug": "chinese",
          "typeName": "중식",
          "backgroundColor": getButtonRandomColor("orange"),
          "filterActivated": false,
        },
        {
          "slug": "western",
          "typeName": "서양식",
          "backgroundColor": getButtonRandomColor("green"),
          "filterActivated": false,
        },
        {
          "slug": "vietnamese",
          "typeName": "베트남식",
          "backgroundColor": getButtonRandomColor("yellow"),
          "filterActivated": false,
        },
        {
          "slug": "cafe",
          "typeName": "카페",
          "backgroundColor": getButtonRandomColor("purple"),
          "filterActivated": false,
        },
        {
          "slug": "dessert",
          "typeName": "디저트/빵",
          "backgroundColor": getButtonRandomColor("pink"),
          "filterActivated": false,
        },
        {
          "slug": "fastfood",
          "typeName": "패스트푸드",
          "backgroundColor": getButtonRandomColor("red"),
          "filterActivated": false,
        },
        {
          "slug": "etc",
          "typeName": "기타",
          "backgroundColor": getButtonRandomColor("monochrome"),
          "filterActivated": false,
        },
      ],
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

  .control-container {
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;

    &:first-child { margin-top: 0; }

    .title {
      text-align: center;
      font-size: 1.25em;
      font-weight: 700;
      margin-bottom: 0.5rem;
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
      padding: 0.1em 0.1em;
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
        z-index: -1;

        transition: background-color 0.33s, height 0.33s $ease-out-bezier;
      }

      &:hover, &.checked {
        color: $body-foreground-color;
        padding: 0.1em 0.33em;

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
