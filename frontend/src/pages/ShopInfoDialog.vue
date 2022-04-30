<template>
  <div class="dialog" @click.self.stop.prevent="$router.back()">
    <div class="dialog-inner">
      <div class="title-area">
        <span class="title">{{ shopInfo.name }}</span>
        <a class="close" @click="$router.back()"><img src="@/assets/icons/mdi-close-black.svg" alt="가게 정보 창 닫기" /></a>
      </div>

      <div class="subtitle-area">
        <shop-type-badge :type="shopInfo.type" />
      </div>

      <table class="info-table">
        <tr>
          <th><img src="@/assets/icons/mdi-clock-time-three-outline-black.svg" /> <strong>운영 시간</strong></th>
          <td><span>{{ shopInfo.operating_time }}</span></td>
        </tr>
        <tr>
          <th><img src="@/assets/icons/mdi-card-account-phone-outline-black.svg" /> <strong>전화번호</strong></th>
          <td><a :href="`tel:${shopInfo.phone_number}`">{{ shopInfo.phone_number }}</a></td>
        </tr>
        <tr>
          <th><img src="@/assets/icons/mdi-map-marker-outline-black.svg" /> <strong>주소</strong></th>
          <td><span>{{ shopInfo.address }}</span></td>
        </tr>
        <tr>
          <th class="info-menus-header"><img src="@/assets/icons/mdi-clipboard-list-outline-black.svg" /> <strong>주요 메뉴</strong></th>
          <td>
            <table class="info-menus-table">
              <tr v-for="menu in shopInfo.menus"
                  :key="menu.menu_name">
                <td>{{ menu.menu_name }}</td>
                <td>{{ formatCurrency(menu.menu_price) }}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <div class="leave-review-container">
        <div class="please-review-text"><strong>리뷰를 남겨주세요!</strong> 리뷰 하나하나가 다른 연수생의 한 끼를 결정하는 데에 큰 도움이 됩니다.</div>
        <star-rating v-model:rating="reviewRating" :increment="0.5" />

        <div>
          <span>이름 : </span><input v-model="reviewWriter" type="text" placeholder="리뷰 작성자명">
        </div>
        <input v-model="reviewText" type="text" placeholder="리뷰 내용...">

        <input type="button" value="리뷰 남기기" @click="onLeaveReviewButtonClick" :disabled="reviewText.length <= 0 || reviewWriter.length <= 0">
      </div>

      <ul class="reviews-container">
        <li v-for="review in reviews"
            :key="review.id">
          {{ review.content }}
        </li>
      </ul>
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
        menus: [],
      },
      reviews: [],
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
    formatCurrency(num) {
      if(!isNaN(num)) {
        return new Intl.NumberFormat("ko-KR", { style: "currency", "currency": "KRW" }).format(num);
      } else {
        return num;
      }
    },
  },
  async mounted() {
    /* get shop info */
    this.$data.shopInfo = await API.apiGet(`/shops/detail/${this.$route.params.id}`);
    /* === */
    /* get reviews */
    this.$data.reviews = await API.apiGet(`/shops/reviews/${this.$route.params.id}`);
    /* === */
  },
};
</script>

<style lang="scss">
.vue-star-rating-rating-text:after {
  content: "점";
}
</style>

<style lang="scss" scoped>
a {
  cursor: pointer;
  position: relative;
  color: currentColor;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    width: 0;
    height: 2px;
    background-color: currentColor;
    transition: width 0.33s $ease-out-bezier;
  }

  &:hover {
    &::before {
      width: 100%;
    }
  }
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
      width: 100% !important;
      height: 100% !important;
      max-height: initial !important;
      border-radius: 0 !important;
    }
  }

  &-inner {
    box-sizing: border-box;
    overflow: overlay;
    position: relative;
    min-width: 450px;
    width: 40vw;
    max-width: 100%;
    max-height: 95vh;
    padding: 2rem;

    border-radius: 0.5rem;
    color: $body-background-color;
    background-color: rgba($body-foreground-color, 0.95);
    box-shadow: 0 1rem 2rem rgba($body-background-color, 0.66);

    &::-webkit-scrollbar {
      width: 0.8rem;
      height: 95%;

      &-thumb {
        border: 0.3rem solid rgba(0, 0, 0, 0);
        border-top-width: 0.4rem;
        border-bottom-width: 0.4rem;

        background: $body-background-color;
        background-clip: padding-box;
      }
    }

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

    .info-table {
      width: 100%;
      text-align: left;

      * {
        vertical-align: middle;
      }

      tr > * {
        padding: 0.33em;

        &:first-child {
          padding: 0.33em 0.33em 0.33em 0;
        }
      }

      th {
        white-space: nowrap;
      
        img {
          margin-right: 0.33em;
        }
      }

      th.info-menus-header {
        vertical-align: top;
      }

      table.info-menus-table {
        width: 100%;
      }
    }

    .leave-review-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1rem;
      padding: 1rem 0;
      
      border-top: solid 1px $body-background-color;
      border-bottom: solid 1px $body-background-color;

      .please-review-text {
        font-weight: 300;
        font-size: 1.1em;
        margin-bottom: 0.5em;
        padding: 0 0.5em;

        strong {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
