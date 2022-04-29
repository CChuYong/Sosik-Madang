<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div class="title-area">
        <span class="title">{{ shopInfo.name }}</span>
        <a class="close" @click="$router.back()"><img src="@/assets/icons/mdi-close-black.svg" alt="가게 정보 창 닫기" /></a>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/functions/apiutils";

export default {
  name: "ShopInfoDialog",
  data() {
    return {
      shopInfo: {
        name: "불러오는 중...",
        type: "",
        reviewCount: -1,
        rating: -1,
        location: {
          lat: -1,
          lng: -1,
        },
      },
    };
  },
  async mounted() {
    const shopData = await API.apiGet(`/shops/info/${this.$route.params.id}`);

    this.$data.shopInfo = {
      name: shopData.name,
      type: shopData.type,
      reviewCount: shopData.reviewCount,
      rating: shopData.rating,
      location: {
        lat: shopData["location_lat"],
        lng: shopData["location_lng"],
      },
    };

    console.log(this.$data.shopInfo);
  },
};
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
  color: currentColor;
  text-decoration: none;
}

.dialog {
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999999;

  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);

  @media screen and (max-width: $media-small-width) {
    display: block;

    &-inner {
      box-sizing: border-box;
      width: 100% !important;
      height: 100% !important;
      border-radius: 0 !important;
    }
  }

  &-inner {
    position: relative;
    min-width: 300px;
    width: 33vw;
    max-width: 100%;
    padding: 2rem;

    border-radius: 0.5rem;
    color: $body-background-color;
    background-color: rgba($body-foreground-color, 0.9);
    box-shadow: 0 1rem 2rem rgba($body-background-color, 0.66);
    backdrop-filter: blur(2px);

    .title-area {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.5em;

      padding: 0 0.5rem 1rem 0.5rem;
      border-bottom: solid 1px $body-background-color;
      margin-bottom: 1rem;

      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 700;
        font-size: 1.25em;
      }

      .close {
        display: flex;
        align-items: center;

        margin-left: 1rem;

        img {
          height: 100%;
          padding: 0.25rem;

          &:hover {
            background-color: rgba($body-background-color, 0.25);
            border-radius: 65536rem;
          }
        }
      }
    }
  }
}
</style>
