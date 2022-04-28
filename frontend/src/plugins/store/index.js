import { createStore } from "vuex";

export default createStore({
  state: {
    mapInstance: null,
    shopListAll: [],
    shopListFlyoutShown: false,
  },
  mutations: {
    shopListAll(state, list) {
      state.shopListAll = list;
    },
    shopListFlyoutShown(state, bool) {
      state.shopListFlyoutShown = bool;
    }
  },
});
