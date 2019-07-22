<template>
  <div id="home">
    <!-- 首页轮播 -->
    <div class="swiper-container" id="homeBanner">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in bannerData" :key="index">
          <p>
            <img :src="item.img_url" :alt="item.img_alt" />
          </p>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination a"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-content">
        <div class="swiper-button-prev a">
          <el-button icon="el-icon-arrow-left" circle></el-button>
        </div>
        <div class="swiper-button-next a">
          <el-button icon="el-icon-arrow-right" circle></el-button>
        </div>
      </div>
    </div>
    <!-- 搜索 -->
    <div id="homeSearch">
      <div class="l">
        <span>热门搜索关键词：</span>
        <a
          :href="`/search?value=${item.name}`"
          v-for="(item,index) in searchData"
          :key="index"
        >{{item.name}}</a>
      </div>
      <div class="r">
        <p>
          <input type="search" v-model="searchValue" />
          <i class="el-icon-search" @click="searchAll"></i>
        </p>
      </div>
    </div>
    <!-- 首页列表1 -->
    <div id="homeList1" :style="isWap?'':`background: url(${homeList1.imgurl}) no-repeat center;`">
      <div class="content">
        <div class="r">
          <h2>{{homeList1.name}}</h2>
          <div>{{homeList1.desc}}</div>
          <ul>
            <li v-for="(item,index) in homeList1.imgs" :key="index">
              <a href="javascript:">
                <div>
                  <div class="img">
                    <img :src="item.img_url" :alt="item.img_alt" />
                  </div>
                  <p>{{item.title}}</p>
                </div>
                <h2>{{item.desc}}</h2>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="homeList2">
      <div class="content">
        <div class="l">
          <h2>{{homeList2.title}}</h2>
          <div v-html="homeList2.describe">{{homeList2.describe}}</div>
          <ul>
            <li v-for="item in homeList2.datalist" :key="item.product_id">
              <a :href="`/productDetails/${item.product_id}.html`">
                <div class="img">
                  <img :src="item.img_url" :alt="item.img_alt" />
                </div>
                <p>{{item.function}}</p>
                <h2>{{item.name}}</h2>
                <span>查看详情</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="homeList3">
      <div class="content">
        <h2>{{homeList3.title}}</h2>
        <div class="describe" v-html="homeList3.describe">{{homeList3.describe}}</div>
        <div class="swiper-container" id="list3banner">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in homeList3.datalist" :key="index">
              <p>
                <img :src="item.img_url" :alt="item.img_alt" />
              </p>
            </div>
          </div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-content">
            <div class="swiper-button-prev b">
              <el-button icon="el-icon-arrow-left" circle></el-button>
            </div>
            <div class="swiper-button-next b">
              <el-button icon="el-icon-arrow-right" circle></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="newContent">
      <div class="content">
        <h2>{{newTitle}}</h2>
        <div class="new">
          <div class="l">
            <div class="swiper-container" id="newBanner">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in newBannerData" :key="index">
                  <a :href="`/articleDetails/84/${item.article_id}.html`">
                    <p>
                      <img :src="item.img_url" :alt="item.img_alt" />
                    </p>
                  </a>
                </div>
              </div>
              <!-- 如果需要分页器 -->
              <div class="swiper-pagination c"></div>
              <!-- 如果需要导航按钮 -->
              <div class="swiper-button-content">
                <div class="swiper-button-prev c">
                  <el-button icon="el-icon-arrow-left" circle></el-button>
                </div>
                <div class="swiper-button-next c">
                  <el-button icon="el-icon-arrow-right" circle></el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="r">
            <ul>
              <li v-for="(item,index) in newDataList" :key="item.id">
                <a :href="`/articleDetails/84/${item.article_id}.html`" v-if="index==0" class="top">
                  <h2>{{item.title}}</h2>
                  <div class="describe">{{item.desc}}</div>
                  <div class="bottom">
                    <span>{{item.date}}</span>
                    <p>
                      <i class="el-icon-view"></i>
                      {{item.stat}}
                    </p>
                  </div>
                </a>
                <a
                  :href="`/articleDetails/84/${item.article_id}.html`"
                  v-if="index!=0"
                  class="list"
                >
                  <div>
                    <h2>{{item.title}}</h2>
                    <span>{{item.date}}</span>
                  </div>
                </a>
              </li>
            </ul>
            <a href="/article">查看更多>></a>
          </div>
        </div>
      </div>
    </div>
    <div id="newContent2">
      <div class="content">
        <h2>{{newTitle2}}</h2>
        <div class="new2">
          <div class="swiper-container" id="newBanner2">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in newBannerData2" :key="index">
                <a href="javascript:">
                  <p>
                    <img :src="item.img_url" :alt="item.img_alt" />
                  </p>
                  <h2>{{item.title}}</h2>
                  <div>{{item.desc}}</div>
                </a>
              </div>
            </div>
          </div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-content">
            <div class="swiper-button-prev d">
              <el-button icon="el-icon-arrow-left" circle></el-button>
            </div>
            <div class="swiper-button-next d">
              <el-button icon="el-icon-arrow-right" circle></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="guide">
      <div class="content">
        <ul>
          <li>
            <h2>脱发指南</h2>
            <div class="list" v-for="(item,index) in guideData1" :key="item.id">
              <a :href="`/articleDetails/82/${item.article_id}.html`">
                <p v-if="index==0">
                  <img :src="item.img_url" :alt="item.img_alt" />
                </p>
                <h2>
                  <i class="el-icon-arrow-right"></i>
                  {{item.title}}
                </h2>
                <div class="describe">{{item.desc}}</div>
              </a>
            </div>
            <a href="/guide">查看更多>></a>
          </li>
          <li>
            <h2>基因育发</h2>
            <div class="list" v-for="(item,index) in guideData2" :key="item.id">
              <a :href="`/articleDetails/81/${item.article_id}.html`">
                <p v-if="index==0">
                  <img :src="item.img_url" :alt="item.img_alt" />
                </p>
                <h2>
                  <i class="el-icon-arrow-right"></i>
                  {{item.title}}
                </h2>
                <div class="describe">{{item.desc}}</div>
              </a>
            </div>
            <a href="/hairgeme">查看更多>></a>
          </li>
        </ul>
      </div>
    </div>
    <div id="faq">
      <div class="content">
        <div class="r">
          <h2>常见问题</h2>
          <div class="faqBanner">
            <div
              class="faqBannerList"
              :style="`transform:translateY(${faqBannerTop}px);`"
              @mousemove="faqBannerMove"
              @mouseout="faqBannerOut"
              @mouseover="faqBannerMove"
              :data-top="faqBannerTop"
            >
              <ul>
                <li v-for="(item,index) in faqData" :key="index">
                  <a
                    :href="`/faqDetails/${item.parent_type_id}/${item.type_id}/${item.article_id}.html`"
                  >
                    <h2>{{item.title}}</h2>
                    <div>{{item.desc}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <a href="/faqList">更多热门问题>></a>
        </div>
      </div>
    </div>
    <div class="leftNav">
      <ul>
        <li
          v-for="(item,index) in leftNavData"
          :key="index"
          :data-name="item.name"
          :class="item.on"
          @click="navThis(item.name)"
        >
          <p v-html="item.content">{{item.content}}</p>
        </li>
      </ul>
    </div>
    <div class="activityWin" v-show="activityWin.img_url!=null" >
      <img :src="activityWin.img_url" :alt="activityWin.img_alt" />
      <span @click="activityWin.img_url=null"><i class="el-icon-circle-close"></i></span>
    </div>
  </div>
</template>
<script>
import banner from "../../../src/assets/js/home/homebanner";
import datas from "../../../src/assets/js/home/datas";
import http from "@/http.js";
export default {
  name: "Home",
  data() {
    return {
      thisNav: "",
      searchValue: "",
      metadata: {
        name: "",
        seo_words: "",
        seo_desc: ""
      },
      leftNavData: [
        { name: "homeList1", content: "产品<br/>优势", on: "" },
        { name: "homeList2", content: "产品<br/>系列", on: "" },
        { name: "homeList3", content: "专利<br/>证书", on: "" },
        { name: "newContent", content: "资讯<br/>中心", on: "" },
        { name: "guide", content: "脱发<br/>指南", on: "" },
        { name: "faq", content: "常见<br/>问题", on: "" }
      ],
      faqBannerTop: 0,
      setObj: {},
      isWap: false,
      activityWin: {},
      ...datas
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
  methods: {
    rNavShow() {
      let the = this;
      the.show = true;
    },
    rNavHide() {
      let the = this;
      setTimeout(function() {
        the.show = false;
      }, 50);
    },
    searchAll() {
      let the = this;
      if (the.searchValue == "") {
        this.$confirm("请输入搜索关键字", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }

      the.$router.push("/search?value=" + the.searchValue);
    },
    faqBannerMove() {
      clearInterval(this.setObj);
    },
    faqBannerOut() {
      let the = this;
      let len = the.faqData.length;
      if (len > 4) {
        let i = the.faqBannerTop;
        the.setObj = setInterval(function() {
          if (i == -95) {
            i = 0;
            let _data = [];
            the.faqData.forEach(function(value, index) {
              if (index > 1) {
                _data.push(value);
              }
            });
            _data.push(the.faqData[0]);
            _data.push(the.faqData[1]);
            the.faqData = _data;
          } else {
            i--;
          }
          the.faqBannerTop = i;
        }, 40);
      }
    },
    scrollNav() {
      let the = this;
      let navarr = [
        "homeList1",
        "homeList2",
        "homeList3",
        "newContent",
        "guide",
        "faq"
      ];
      let isNull = true;
      navarr.forEach((item, index) => {
        if (
          window.scrollY > window[item].offsetTop - window.innerHeight / 2 &&
          window.scrollY < window[item].offsetTop + window[item].scrollHeight
        ) {
          isNull = !isNull;
          the.leftNavData.map((value, key) => {
            value.on = key == index ? "on" : "";
          });
        }
      });
      if (
        window.scrollY <
        window["homeList1"].offsetTop - window.innerHeight / 2
      ) {
        the.leftNavData.map((value, key) => {
          value.on = "";
        });
        the.thisNav = "";
      }
    },
    navThis(e) {
      let tops = window.scrollY;
      let the = this;
      if (the.thisNav == e) return;
      let i = tops > window[e].offsetTop - 100;
      the.thisNav = e;
      let sets = setInterval(() => {
        if (
          (i && tops < window[e].offsetTop - 100) ||
          (!i && tops > window[e].offsetTop - 100)
        ) {
          clearInterval(sets);
        }
        if (
          (i && tops - window[e].offsetTop > 1500) ||
          (!i && window[e].offsetTop - tops > 1500)
        ) {
          tops = i ? tops - 30 : tops + 30;
        } else if (
          (i && tops - window[e].offsetTop > 1000) ||
          (!i && window[e].offsetTop - tops > 1000)
        ) {
          tops = i ? tops - 20 : tops + 20;
        } else if (
          (i && tops - window[e].offsetTop > 500) ||
          (!i && window[e].offsetTop - tops > 500)
        ) {
          tops = i ? tops - 12 : tops + 12;
        } else {
          tops = i ? tops - 8 : tops + 8;
        }

        the.__getPageScrollY(tops);
      }, 5);
    },
    __getPageScrollY(top) {
      if (top || Number(top) == 0) {
        //设置垂直滚动值
        if (self.pageYOffset) {
          self.pageYOffset = Number(top);
        }
        if (
          document.documentElement != undefined &&
          document.documentElement.scrollTop != undefined
        ) {
          // Explorer 6 Strict
          document.documentElement.scrollTop = Number(top);
        }
        if (document.body != undefined) {
          // all other Explorers
          document.body.scrollTop = Number(top);
        }
        return true;
      } else {
        //获取垂直滚动值
        var yScroll;
        if (self.pageYOffset) {
          yScroll = self.pageYOffset;
        } else if (
          document.documentElement &&
          document.documentElement.scrollTop
        ) {
          // Explorer 6 Strict
          yScroll = document.documentElement.scrollTop;
        } else if (document.body) {
          // all other Explorers
          yScroll = document.body.scrollTop;
        }
        return yScroll;
      }
    }
  },
  beforeDestroy() {
    let the = this;
  },
  mounted() {
    let the = this;
    the.isWap = window.innerWidth <= 800;
    window.addEventListener("scroll", the.scrollNav);
    //首页关键字
    http
      .fetchGet("/api/Home/Activity")
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.img_url = datas.result.img_url!=null?http.path + "/" + datas.result.img_url:null;
          the.activityWin = datas.result;
        }
      })
      .catch(err => {
        console.log(err);
      });
    //首页关键字
    http
      .fetchGet("/api/Home/webinfo")
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.metadata = {
            name: datas.result.name,
            seo_words: datas.result.seo_words,
            seo_desc: datas.result.seo_desc
          };
        }
      })
      .catch(err => {
        console.log(err);
      });
    http
      .fetchGet("/api/Home/IndexBanner", {
        args: {
          start: 0,
          limit: 5, //每页记录数
          sort: "sortorder asc,articleid", //排序字段
          dir: "desc", //升序or降序
          NavCode: "banner" //内容编码
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.map(value => {
            value.img_url = http.path + "/" + value.img_url;
            return value;
          });
          the.bannerData = [...datas.result];
          //顶部轮播
          setTimeout(function() {
            banner.homebanner();
          }, 100);
        }
      })
      .catch(err => {
        console.log(err);
      });
    //产品介绍
    http
      .fetchGet("/api/Home/IndexProductDesc")
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.imgurl = http.path + "/" + datas.result.imgurl;
          datas.result.imgs.map(obj => {
            obj.img_url = http.path + "/" + obj.img_url;
          });
          the.homeList1 = datas.result;
        }
        the.scrollNav();
      })
      .catch(err => {
        console.log(err);
      });
    //产品列表
    http
      .fetchGet("/api/Home/IndexProducts", {
        args: {
          IsIndexShow: true
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.map(obj => {
            obj.img_url = http.path + "/" + obj.img_url;
          });
          the.homeList2.datalist = datas.result;
        }
      })
      .catch(err => {
        console.log(err);
      });
    //专利证书
    http
      .fetchGet("/api/Home/IndexCertificates")
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.map((obj, index) => {
            obj.img_url =
              obj.img_url != null ? http.path + "/" + obj.img_url : "";
            if (the.homeList3.datalist.length <= 11 && obj.img_url != "") {
              the.homeList3.datalist.push(obj);
            }
          });
          setTimeout(function() {
            //专利证书
            banner.homebanner2(the);
          }, 100);
        }
      })
      .catch(err => {
        console.log(err);
      });
    //资讯中心
    http
      .fetchGet("/api/Home/IndexNews", {
        args: {
          start: 0,
          limit: 6,
          sort: "sortorder asc,releasetime",
          dir: "desc",
          NavCode: "News",
          IsIndexShow: true,
          IsRelease: true
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.map((obj, index) => {
            obj.img_url =
              obj.img_url != null ? http.path + "/" + obj.img_url : "";
            if (index <= 2) {
              the.newBannerData.push(obj);
              the.newDataList.push(obj);
            } else {
              the.newDataList.push(obj);
            }
          });
          //新闻轮播
          setTimeout(function() {
            banner.homebanner3();
          }, 100);
        }
      })
      .catch(err => {
        console.log(err);
      });
    //新闻报道
    http
      .fetchGet("/api/Home/IndexMedia", {
        args: { sort: "sortorder asc,articleid", dir: "desc", NavCode: "Media" }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.map((obj, index) => {
            obj.img_url =
              obj.img_url != null ? http.path + "/" + obj.img_url : "";
            if (the.newBannerData2.length <= 12 && obj.img_url != "") {
              the.newBannerData2.push(obj);
            }
          });
          setTimeout(function() {
            //新闻报道轮播
            banner.homebanner4(the);
          }, 100);
        }
      })
      .catch(err => {
        console.log(err);
      });
    //脱发指南 and 基因育发
    http
      .fetchGet("/api/Home/IndexGuideOrHair", {
        args: {
          start: 0,
          limit: 3,
          sort: "sortorder asc,releasetime",
          dir: "desc",
          NavCode: "Guide",
          IsIndexShow: true,
          IsRelease: true
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.map((obj, index) => {
            obj.img_url =
              obj.img_url != null ? http.path + "/" + obj.img_url : "";
            if (the.guideData1.length <= 1 && obj.img_url != "") {
              the.guideData1.push(obj);
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    http
      .fetchGet("/api/Home/IndexGuideOrHair", {
        args: {
          start: 0,
          limit: 3,
          sort: "sortorder asc,releasetime",
          dir: "desc",
          NavCode: "Hair",
          IsIndexShow: true,
          IsRelease: true
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.map((obj, index) => {
            obj.img_url =
              obj.img_url != null ? http.path + "/" + obj.img_url : "";
            if (the.guideData2.length <= 1 && obj.img_url != "") {
              the.guideData2.push(obj);
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    http
      .fetchGet("/api/Home/IndexFaq", {
        args: {
          sort: "sortorder asc,releasetime ",
          dir: "desc",
          NavCode: "Faq",
          IsRelease: true,
          IsHotRecommend: true
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.map((obj, index) => {
            obj.desc =
              obj.desc == "" || obj.desc == null ? "暂无回答" : obj.desc;
            if (the.faqData.length <= 9) {
              the.faqData.push(obj);
            }
          });
          let len = the.faqData.length;
          if (len > 4 && !the.isWap) {
            let i = 0;
            the.setObj = setInterval(function() {
              if (i == -95) {
                i = 0;
                let _data = [];
                the.faqData.forEach(function(value, index) {
                  if (index > 1) {
                    _data.push(value);
                  }
                });
                _data.push(the.faqData[0]);
                _data.push(the.faqData[1]);
                the.faqData = _data;
              } else {
                i--;
              }
              the.faqBannerTop = i;
            }, 40);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
    //搜索关键词
    http
      .fetchGet("/api/Article/Labels", {
        args: {
          start: 0,
          limit: 5,
          sort: "sortorder asc,hotsearchtime",
          dir: "desc",
          TypeCode: "Label",
          IsHotSearch: true
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.searchData = datas.result;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="../../assets/less/home.less"></style>
<style>
div.el-carousel__mask {
  background-color: rgba(0, 0, 0, 0);
}
.el-carousel__arrow {
  height: 43px;
  width: 43px;
  font-size: 25px;
}
.el-carousel__arrow i {
  font-weight: 600;
}
.el-carousel--horizontal {
  overflow: hidden;
}
.swiper-pagination.c .swiper-pagination-bullet {
  width: 6px;
  height: 6px;
}
#homeBanner .swiper-button-content div button i,
#homeList3 .content div.swiper-container .swiper-button-content div button i,
#newContent .content div.new div.l .swiper-button-content > div button i,
#newContent2 .content div.new2 .swiper-button-content > div button i {
  font-size: 25px;
}

@media (max-width: 799px) {
  #homeBanner .swiper-button-content {
    display: none;
  }
  #homeBanner .swiper-button-content div button i,
  #homeList3 .content div.swiper-container .swiper-button-content div button i,
  #newContent .content div.new div.l .swiper-button-content > div button i,
  #newContent2 .content div.new2 .swiper-button-content > div button i {
    font-size: 14px;
  }
  #homeBanner .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
  }
}
</style>
