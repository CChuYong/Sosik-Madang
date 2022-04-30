<template>
  <div id="map" ref="map"></div>
</template>

<script>
function addMarker(map, lat, lng, markerImage = null) {
  const marker = new window.kakao.maps.Marker({
    position: new window.kakao.maps.LatLng(lat, lng),
    image: markerImage ? markerImage : undefined,
  });
  marker.setMap(map);

  return marker;
}

function addInfoWindow(map, target, html, lat, lng, removable = true) {
  const infoWindow = new window.kakao.maps.InfoWindow({
    position: new window.kakao.maps.LatLng(lat, lng),
    content: `<div class='infowindow'>${html}</div>`,
    removable,
  });

  infoWindow.open(map, target);
  return infoWindow;
}

export default {
  name: "MainMap",
  methods: {
    initMap() {
      const somaCenterPosition = { lat: 37.5039300, lng: 127.0448028 };
    
      /* 맵 인스턴스 생성 */
      const mapInstance = new window.kakao.maps.Map(this.$refs.map, {
        center: new window.kakao.maps.LatLng(somaCenterPosition.lat, somaCenterPosition.lng),  // 소마센터
        level: 2,
      });

      /* 소마센터 마커 */
      const marker = addMarker(mapInstance, somaCenterPosition.lat, somaCenterPosition.lng,
        new window.kakao.maps.MarkerImage(
          require("@/assets/markers/swmaestro-logo-compressed.png"),
          new window.kakao.maps.Size(96, 41),
          { offset: new window.kakao.maps.Point(48, 20) },
        ));
      addInfoWindow(mapInstance, marker, "<span class='accent'>SW마에스트로 연수센터</span>", somaCenterPosition.lat, somaCenterPosition.lng, false);

      /* 맵 인스턴스를 vuex store에 등록 */
      this.$store.commit("mapInstance", mapInstance);

      /* 모든 가게에 대해 마커 생성 */
      this.registerAllShopsMarker();
    },
    registerAllShopsMarker() {
      this.$store.state.shopListAll.forEach((shop) => {
        addMarker(this.$store.state.mapInstance, shop["location_lat"], shop["location_lng"]);
      });
    },
  },
  mounted() {
    if(!window.kakao || !window.kakao.maps) {
      // Insert KakaoMap API script
      const kakaoMapScript = document.createElement("script");
      kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_TOKEN}`;
      document.head.appendChild(kakaoMapScript);

      kakaoMapScript.addEventListener("load", () => {
        window.kakao.maps.load(this.initMap);
      });
    } else {
      this.initMap();
    }
  },
};
</script>

<style lang="scss">
#map {
  color: $body-background-color;

  .infowindow {
    padding: 0.75rem;

    .accent { color: darken($body-accent-color, 33%); }
  }
}
</style>
