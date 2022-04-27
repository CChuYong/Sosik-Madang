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
              @click="() => { type.filterActivated = !type.filterActivated; updateMap(); }">
          {{ type.typeName }}
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
      ],
    };
  },
  methods: {
    updateMap() {
      // TODO
    },
  },
};
</script>

<style lang="scss" scoped>
#map-controls {
  display: flex;
  flex-direction: column;

  width: 8rem;
  padding: 1rem;
  color: $body-background-color;
  background-color: rgba($body-foreground-color, 0.75);
  backdrop-filter: blur(0.5rem);
  box-shadow: 0 0.33rem 1rem rgba($body-background-color, 0.33);
  border-radius: 0.5em;

  .control-container {
    display: flex;
    flex-direction: column;

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

      & > .button {
        text-align: center;
        width: calc(50% - 1rem);
        padding: 0.33rem;
        margin: 0.17rem;
      }
    }
  }
}
</style>
