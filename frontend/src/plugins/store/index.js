import { createStore } from "vuex";
import randomColor from "randomcolor";

function getButtonRandomColor(hue) {
  return randomColor({
    hue,
    luminosity: "dark",
    alpha: 0.75,
    format: "rgba",
  });
}

export default createStore({
  state: {
    mapInstance: null,
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
    shopListAll: [],
    shopMarkersAll: [],
    shopListFlyoutShown: false,

    reviewWriter: "",
  },
  mutations: {
    mapInstance(state, instance) {
      state.mapInstance = instance;
    },
    kakaoMapScriptLoaded(state, bool) {
      state.kakaoMapScriptLoaded = bool;
    },
    shopListAll(state, list) {
      state.shopListAll = list;
    },
    shopMarkersAll(state, list) {
      state.shopMarkersAll = list;
    },
    shopListFlyoutShown(state, bool) {
      state.shopListFlyoutShown = bool;
    },

    reviewWriter(state, str) {
      state.reviewWriter = str;
    },
  },
});
