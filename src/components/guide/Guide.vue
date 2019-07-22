<template>
  <div id="articles">
    <el-image class="streamer" :src="streamerUrl" fit="scale-down"></el-image>
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
    <div class="articlelist">
      <div class="l">
        <ul>
          <li v-for="item in articleData" :key="item.article_id">
            <a
              :href="`/articleDetails/${parentid}/${item.article_id}.html`"
              
            >
              <el-image class="listImg" :src="item.img_url" :alt="item.img_alt" fit="scale-down"></el-image>
              <div class="listContent">
                <h2>{{item.title}}</h2>
                <p>
                  <span>
                    <i class="el-icon-time"></i>
                    {{item.date}}
                  </span>
                  <span>
                    <i class="el-icon-view"></i>
                    {{item.stat}}
                  </span>
                </p>
              </div>
            </a>
          </li>
        </ul>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="indexNum"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="totalNum"
        ></el-pagination>
      </div>
      <div class="r">
        <div class="list">
          <ul>
            <li
              v-for="item in articleNavData"
              :key="item.menu_id"
              :data-key="item.menu_id"
              :class="`${item.on}`"
            >
              <a :href="articleNav[item.menu_id]">
                <h2>{{item.name}}</h2>
              </a>
            </li>
          </ul>
        </div>
        <div class="recommen">
          <div class="title">相关推荐</div>
          <ul>
            <li v-for="item in recommenData" :key="item.article_id">
              <a
                :href="`/articleDetails/${parentid}/${item.article_id}.html`"
                
              >
                <h2>{{item.title}}</h2>
                <p>{{item.date}}</p>
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
  name: "articles",
  data() {
    return {
      parentid: "",
      streamerUrl: '',
      searchData: [],
      articleData: [],
      articleNavData: [],
      articleNav: {
        0: "/index",
        64: "/product",
        84: "/article",
        81: "/hairgeme",
        82: "/guide",
        80: "/welfafe",
        50: "/aboutus",
        143: "/media",
        144: "/faq"
      },
      recommenData: [],
      totalNum: 0,
      indexNum: 0,
      pageSize: 6,
      searchValue:'',
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
  methods: {
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
    handleCurrentChange(e) {
      let the = this;
      the.articlePage(e);
    },
    handleSizeChange(e) {
      let the = this;
      the.articlePage(e);
    },
    articlePage(e) {
      let the = this;
      e = e - 1;
      //文章列表
      http
        .fetchGet("/api/Article/Articles", {
          args: {
            start: e*the.pageSize,
            limit: the.pageSize,
            sort: "sortorder asc,releasetime",
            dir: "desc",
            IsRelease: true,
            NavCode: "Guide"
          }
        })
        .then(data => {
          let datas = JSON.parse(data.data);
          if (datas.errcode) {
            datas.result.products.map(obj => {
              obj.img_url = http.path + "/" + obj.img_url;
            });
            the.articleData = datas.result.products;
            the.totalNum = datas.result.total_count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    let the = this;
    the.articlePage(1);
    //seo
    http
      .fetchGet("/api/Home/MenuDetail", { id: 82 })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.metadata = {
            name: datas.result.web_title,
            seo_words: datas.result.seo_words,
            seo_desc: datas.result.seo_desc
          };
          the.streamerUrl = datas.result.img_url?http.path + "/" + datas.result.img_url:require("@/assets/images/streamer_article.png");
        }
      })
      .catch(err => {
        console.log(err);
      });
    //相关推荐
    http
      .fetchGet("/api/Article/Articles", {
        args: {
          start: 0,
          limit: 5,
          sort: "sortorder asc,releasetime",
          dir: "desc",
          IsRelease: true,
          NavCode: "Guide",
          IsRecommend:true
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

    //导航分类
    http
      .fetchGet("/api/Article/MenuArticle")
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.map((obj, index) => {
            if (the.$route.query.id == obj.menu_id) {
              obj.on = "on";
              the.parentid = the.$route.query.id;
            }
            if (!the.$route.query.id && obj.menu_id == 82) {
              obj.on = "on";
              the.parentid = obj.menu_id;
            } else {
              obj.on = "";
            }
          });
          the.articleNavData = datas.result;
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
<style scoped lang="less" src="../../assets/less/article.less"></style>
