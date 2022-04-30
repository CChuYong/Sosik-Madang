<template>
  <navigation-bar />

  <div id="router-content">
    <router-view />
  </div>
</template>

<script>
import API from "@/functions/apiutils";
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  "name": "App",
  "components": {
    NavigationBar,
  },
  async mounted() {
    // Register shop list on app startup
    this.$store.commit("shopListAll", await API.apiGet("/shops/info"));

    // Insert KakaoMap API script
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAOMAP_TOKEN}`;
    document.head.appendChild(kakaoMapScript);
  },
};
</script>

<style lang="scss" scoped>
#router-content {
  width: 100%;
  height: 100%;
}
</style>
