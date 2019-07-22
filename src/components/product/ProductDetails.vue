<template>
  <div id="productDetails">
    <el-image class="streamer" :src="streamerUrl" fit="scale-down"></el-image>
    <div class="details">
      <div class="top">
        <div class="l">
          <el-image class="detailsImg" :src="detailsBannerImg" fit="scale-down"></el-image>
          <div class="detailsLeft">
            <div class="swiper-container" id="detailsBanner">
              <div class="swiper-wrapper">
                <div
                  :class="`swiper-slide stop-swiping ${item.on}`"
                  v-for="(item,index) in detailsBannerData"
                  :key="index"
                  :data-index="index"
                >
                  <p>
                    <img :src="item.img_url"  :alt="item.img_alt" />
                  </p>
                </div>
              </div>
            </div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-content">
              <div class="swiper-button-prev e">
                <i class="el-icon-caret-left"></i>
              </div>
              <div class="swiper-button-next e">
                <i class="el-icon-caret-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="r">
          <h2>{{detailsTitle}}</h2>
          <div class="content">
            <div class="productBody">
              <div>
                <h2>【产品名称】</h2>
                <div>{{detailsTitle}}</div>
              </div>
              <div>
                <h2>【产品类别】</h2>
                <div v-html="detailsBody.category">{{detailsBody.category}}</div>
              </div>
              <div>
                <h2>【产品规格】</h2>
                <div v-html="detailsBody.size">{{detailsBody.size}}</div>
              </div>
              <div>
                <h2>【产品功效】</h2>
                <div v-html="detailsBody.function">{{detailsBody.function}}</div>
              </div>
              <div class="multi">
                <h2>【产品特点】</h2>
                <div v-html="detailsBody.feature">{{detailsBody.feature}}</div>
              </div>
              <div>
                <h2>【适用人群】</h2>
                <div v-html="detailsBody.apply_to">{{detailsBody.apply_to}}</div>
              </div>
              <div class="multi">
                <h2>【使用方法】</h2>
                <div v-html="detailsBody.usage">{{detailsBody.usage}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="r">
          <div class="content" v-html="detailsImgBody">{{detailsImgBody}}</div>
        </div>
        <div class="l">
          <div class="title">相关推荐</div>
          <ul>
            <li v-for="item in recommenData" :key="item.product_id">
              <a :href="`/productDetails/${item.product_id}.html`">
                <el-image class="listImg" :src="item.img_url"  :alt="item.img_alt" fit="scale-down"></el-image>
                <h2>{{item.name}}</h2>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/http.js";
export default {
  name: "product",
  data() {
    return {
      streamerUrl: "",
      detailsBannerImg: "",
      detailsTitle: "",
      detailsBannerData: [],
      indexs: 0,
      lens: 0,
      detailsBody: {},
      recommenData: [],
      detailsImgBody: "",
      metadata: {
        name: "",
        seo_words: "",
        seo_desc: ""
      }
    };
  },
  metaInfo() {
    return {
      title: this.metadata.name,
      meta: [
        {
          name: "keywords",
          content: this.metadata.seo_words
        },
        {
          name: "description",
          content: this.metadata.seo_desc
        }
      ]
    };
  },
  methods: {},
  mounted(obj) {
    let the = this;
    //seo
    http
      .fetchGet("/api/Home/MenuDetail", { id: 64 })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.metadata = {
            name: datas.result.web_title,
            seo_words: datas.result.seo_words,
            seo_desc: datas.result.seo_desc
          };
          the.streamerUrl = datas.result.img_url
            ? http.path + "/" + datas.result.img_url
            : require("@/assets/images/streamer_product.png");
        }
      })
      .catch(err => {
        console.log(err);
      });
      let paramsId = this.$route.params.id.replace(/.html/g,'');
      if(isNaN(Number(paramsId))){
        return false;
      }
    //产品详情
    http
      .fetchGet("/api/Article/ProductDetail", {
        id: paramsId
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.img_url = http.path + "/" + datas.result.img_url;
          datas.result.imgs.map((obj, index) => {
            obj.on = index == 0 ? "on" : "";
            obj.img_url = http.path + "/" + obj.img_url;
          });
          the.detailsBannerData = datas.result.imgs;
          the.detailsImgBody = datas.result.desc;
          var srcTop = new RegExp('src="\\/', "g");
          the.detailsImgBody = the.detailsImgBody.replace(
            srcTop,
            'src="' + http.path + "/"
          );
          the.detailsTitle = datas.result.name;
          the.detailsBody = datas.result;
          let len = 0;
          if (window.innerWidth < 800) {
            len =
              the.detailsBannerData.length > 3
                ? 3
                : the.detailsBannerData.length;
          } else {
            len =
              the.detailsBannerData.length > 5
                ? 5
                : the.detailsBannerData.length;
          }
          the.detailsBannerImg = the.detailsBannerData[0].img_url;
          new Swiper("#detailsBanner", {
            slidesPerView: len,
            slidesPerView: len,
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next.e",
              prevEl: ".swiper-button-prev.e"
            },
            noSwiping: true,
            observer: true,
            on: {
              tap: function(event) {
                let e = event.target || event.srcElement;
                let obj =
                  e.parentElement.classList[0] == "swiper-slide"
                    ? e
                    : e.parentElement;
                if (obj.parentElement.classList[0] != "swiper-slide") {
                  return false;
                }
                let i = obj.parentElement.dataset.index;
                the.lens = +i - the.indexs;
                the.detailsBannerData.map((value, key, arr) => {
                  key == i ? (value.on = "on") : (value.on = "");
                  return value;
                });
                the.detailsBannerImg = the.detailsBannerData[i].img_url;
              },
              slideChange: function() {
                let i = this.activeIndex;
                let _i = the.indexs;
                if (_i > i) {
                  _i = the.lens + the.indexs - (the.indexs - i);
                } else {
                  _i = the.indexs + (i - the.indexs) + the.lens;
                }
                the.detailsBannerData.map((value, key, arr) => {
                  key == _i ? (value.on = "on") : (value.on = "");
                  return value;
                });
                the.detailsBannerImg = the.detailsBannerData[_i].img_url;
                the.indexs = this.activeIndex;
              }
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    //相关推荐
    http
      .fetchGet("/api/Article/Products", {
        args: {
          start: 0,
          limit: 10,
          sort: "sortorder asc,releasetime",
          dir: "desc",
          IsRelease: true,
          IsRecommend: true
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.products.map(obj => {
            obj.img_url = http.path + "/" + obj.img_url;
          });
          the.recommenData = datas.result.products;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="../../assets/less/product.less"></style>
