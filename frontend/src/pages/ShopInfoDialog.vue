<template>
  <div class="dialog" @click.self.stop.prevent="$router.back()">
    <div class="dialog-inner">
      <div class="title-area">
        <span class="title">{{ shopInfo.name }}</span>
        <a class="close" @click="$router.back()"><img src="@/assets/icons/mdi-close-black.svg" alt="가게 정보 창 닫기" /></a>
      </div>

      <shop-type-badge :type="shopInfo.type" />

      <p>운영시간 {{ shopInfo.operatingTime }}</p>
      <p>대표 전화번호 {{ shopInfo.phoneNumber }}</p>
      <p>human-readable 주소 {{ shopInfo.address }}</p>
      <p>위도 {{ shopInfo.location.lat }}도, 경도 {{ shopInfo.location.lng }}도</p>

      <div id="leave-review-container">
        <star-rating v-model:rating="reviewRating" :increment="0.5" :show-rating="false" />

        <div>
          <span>이름 : </span><input v-model="reviewWriter" type="text" placeholder="리뷰 작성자명">
        </div>
        <input v-model="reviewText" type="text" placeholder="리뷰 내용...">

        <input type="button" value="리뷰 남기기" @click="onLeaveReviewButtonClick" :disabled="reviewText.length <= 0 || reviewWriter.length <= 0">
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import ShopTypeBadge from "@/components/ShopTypeBadge.vue";
import API from "@/functions/apiutils";

export default {
  name: "ShopInfoDialog",
  components: {
    StarRating,
    ShopTypeBadge,
  },
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
      reviewWriter: "",
      reviewText: "",
      reviewRating: 5,
    };
  },
  methods: {
    async onLeaveReviewButtonClick() {
      await API.apiPut("/shops/reviews", {
        "shop_id": parseInt(this.$route.params.id),
        "writer": this.$data.reviewWriter,
        "rating": parseFloat(this.$data.reviewRating),
        "content": this.$data.reviewText,
      });
    },
  },
  async mounted() {
    /* get shop info */
    const shopData = await API.apiGet(`/shops/detail/${this.$route.params.id}`);

    this.$data.shopInfo = {
      name: shopData.name,
      type: shopData.type,
      operatingTime: shopData["operating_time"],
      phoneNumber: shopData["phone_number"],
      address: shopData.address,
      location: {
        lat: shopData["location_lat"],
        lng: shopData["location_lng"],
      },
    };
    /* === */
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
    min-width: 280px;
    width: 33vw;
    max-width: 100%;
    padding: 2rem;

    border-radius: 0.5rem;
    color: $body-background-color;
    background-color: rgba($body-foreground-color, 0.95);
    box-shadow: 0 1rem 2rem rgba($body-background-color, 0.66);

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
