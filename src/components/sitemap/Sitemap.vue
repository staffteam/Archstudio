<template>
  <div class="sitemap">
    <div class="sitemapHeight"></div>
    <el-row class="sitemapContent">
      <el-col :span="webW" :offset="webL">
        <el-divider>网站栏目</el-divider>
        <span v-for="(item,index) in navData" :key="index">
          <a :href="navList[item.menu_id]" target="_blank">{{item.name}}</a>
        </span>
        <el-divider></el-divider>
      </el-col>
      <el-col :span="webW" :offset="webL">
        <el-divider>产品列表</el-divider>
        <span v-for="item in productData" :key="item.product_id">
          <a :href="`/productDetails/${item.product_id}.html`" target="_blank">{{item.name}}</a>
        </span>
        <el-divider></el-divider>
      </el-col>
      <el-col :span="webW" :offset="webL" class="top20">
        <el-divider>脱发指南</el-divider>
        <span v-for="item in articleData" :key="item.article_id">
          <a :href="`/articleDetails/82/${item.article_id}.html`" target="_blank">{{item.title}}</a>
        </span>
        <el-divider></el-divider>
      </el-col>
      <el-col :span="webW" :offset="webL" class="top20">
        <el-divider>品牌动态</el-divider>
        <span v-for="item in articleData1" :key="item.article_id">
          <a :href="`/articleDetails/84/${item.article_id}.html`" target="_blank">{{item.title}}</a>
        </span>
        <el-divider></el-divider>
      </el-col>
      <el-col :span="webW" :offset="webL" class="top20">
        <el-divider>粉丝福利</el-divider>
        <span v-for="item in articleData2" :key="item.article_id">
          <a :href="`/articleDetails/80/${item.article_id}.html`" target="_blank">{{item.title}}</a>
        </span>
        <el-divider></el-divider>
      </el-col>
      <el-col :span="webW" :offset="webL" class="top20">
        <el-divider>媒体报道</el-divider>
        <span v-for="item in articleData3" :key="item.article_id">
          <a :href="`/articleDetails/143/${item.article_id}.html`" target="_blank">{{item.title}}</a>
        </span>
        <el-divider></el-divider>
      </el-col>
      <el-col :span="webW" :offset="webL" class="top20">
        <el-divider>基因育发</el-divider>
        <span v-for="item in articleData4" :key="item.article_id">
          <a :href="`/articleDetails/81/${item.article_id}.html`" target="_blank">{{item.title}}</a>
        </span>
        <el-divider></el-divider>
      </el-col>
      <el-col :span="webW" :offset="webL" class="top20">
        <el-divider>常见问题</el-divider>
        <span v-for="item in faqData" :key="item.article_id">
          <a :href="`/faqDetails/${item.parent_type_id}/${item.type_id}/${item.article_id}.html`" target="_blank">{{item.title}}</a>
        </span>
        <el-divider></el-divider>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import http from "@/http.js";
export default {
  name: "sitemap",
  data() {
    return {
      productData: [],
      articleData: [],
      articleData1: [],
      articleData2: [],
      articleData3: [],
      articleData4: [],
      webW: 12,
      webL: 6,
      navList: {
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
      navData: [],
      faqData: []
    };
  },
  mounted() {
    let the = this;
    the.webW = window.innerWidth > 800 ? 12 : 22;
    the.webL = window.innerWidth > 800 ? 6 : 1;
    http
      .fetchGet("/api/Home/Menu")
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.logoUrl = http.path + "/" + JSON.parse(data.data).result.logo_url;
          the.navData = [
            { menu_id: 0, name: "首页", name_en: "HOME" },
            ...JSON.parse(data.data).result.menus
          ];
        }
      })
      .catch(err => {
        console.log(err);
      });
    //产品列表
    http
      .fetchGet("/api/Article/Products", {
        args: {
          start: 0,
          limit: 999,
          sort: "sortorder asc,releasetime",
          dir: "desc",
          IsRelease: true
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.productData = datas.result.products;
        }
      })
      .catch(err => {
        console.log(err);
      });
    //品牌动态
    http
      .fetchGet("/api/Article/Articles", {
        args: {
          start: 0,
          limit: 999,
          sort: "sortorder asc,releasetime",
          dir: "desc",
          IsRelease: true,
          NavCode: "News"
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.articleData = datas.result.products;
        }
      })
      .catch(err => {
        console.log(err);
      });
    //脱发指南
    http
      .fetchGet("/api/Article/Articles", {
        args: {
          start: 0,
          limit: 999,
          sort: "sortorder asc,releasetime",
          dir: "desc",
          IsRelease: true,
          NavCode: "Guide"
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.articleData1 = datas.result.products;
        }
      })
      .catch(err => {
        console.log(err);
      });
    //粉丝福利
    http
      .fetchGet("/api/Article/Articles", {
        args: {
          start: 0,
          limit: 999,
          sort: "sortorder asc,releasetime",
          dir: "desc",
          IsRelease: true,
          NavCode: "Welfare"
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.articleData2 = datas.result.products;
        }
      })
      .catch(err => {
        console.log(err);
      });
    //媒体报道
    http
      .fetchGet("/api/Article/Articles", {
        args: {
          start: 0,
          limit: 999,
          sort: "sortorder asc,releasetime",
          dir: "desc",
          IsRelease: true,
          NavCode: "MediaNews"
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.articleData3 = datas.result.products;
        }
      })
      .catch(err => {
        console.log(err);
      });
    //基因育发
    http
      .fetchGet("/api/Article/Articles", {
        args: {
          start: 0,
          limit: 999,
          sort: "sortorder asc,releasetime",
          dir: "desc",
          IsRelease: true,
          NavCode: "Hair"
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.articleData4 = datas.result.products;
        }
      })
      .catch(err => {
        console.log(err);
      });
    //常见问题
    http
      .fetchGet("/api/Article/Faqs", {
        args: {
          sort: "sortorder asc,releasetime",
          dir: "desc",
          NavCode: "Faq",
          IsRelease: true,
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.faqData = datas.result.products;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {}
};
</script>
<style scoped>
.top20 {
  margin-top: 20px;
}
.sitemapHeight {
  height: 100px;
}
.sitemapContent {
  padding: 100px 0;
}
@media (max-width: 800px) {
  .sitemapHeight {
    height: 0;
  }
  .sitemapContent {
    padding: 20px 0;
  }
}
.sitemapContent span a {
  display: block;
  font-size: 16px;
  line-height: 25px;
  padding: 5px 0;
}
.sitemapContent span a:hover {
  color: #409eff;
}
.el-divider--horizontal {
  margin: 20px 0;
}
.el-divider__text {
  font-size: 20px;
}
span {
  font-size: 18px;
}
</style>
