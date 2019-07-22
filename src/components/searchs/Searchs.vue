<template>
  <div id="about">
    <div class="faqHead">
      <el-image class="streamer" :src="streamerUrl" fit="scale-down"></el-image>
      <div class="faqSearch">
        <input type="search" v-model="faqSearchValue" name id placeholder="输问题关键词，如基因育发" />
        <p @click="faqSearch">
          <i class="el-icon-search"></i>
        </p>
      </div>
    </div>
    <div class="faqContent">
      <div class="content">
        <div class="searchContent maxwidth">
          <h2>关于“{{faqValue}}”，共找到{{totalNum}}条相关问题</h2>
          <ul>
            <li v-for="(item,index) in searchData" :key="index">
              <a :href="`${searchType[item.navcode]}${navcodes[item.navcode]?'/'+navcodes[item.navcode]:item.parent_type_id?'/'+item.parent_type_id:''}${item.type_id?'/'+item.type_id:'/'+item.id}${item.id?'/'+item.id:''}.html`">
                <h2 v-html="item.title">{{item.title}}</h2>
                <div
                  v-html="item.desc==''?item.title:item.desc"
                >{{item.desc==''?item.title:item.desc}}</div>
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
      isNavBtnShow: false,
      streamerUrl: require("@/assets/images/streamer_ss.jpg"),
      faqNavData: [],
      weimg: require("@/assets/images/code.png"),
      linkData: [],
      articlesContent: "",
      faqTitle: "",
      faqContent: "",
      faqDate: "",
      faqStat: "",
      faqSearchValue: "",
      faqId: "",
      faqTheId: "",
      totalNum: 0,
      indexNum: 0,
      pageSize: 6,
      searchData: [],
      searchType: {
        product: "/productDetails",
        News: "/articleDetails",
        Hair: "/articleDetails",
        Welfare: "/articleDetails",
        Faq: "/faqDetails",
        Guide: "/articleDetails",
        Media: "/articleDetails"
      },
      navcodes: {
        "Welfare":"80",
        "Hair": "81",
        "Guide": "82",
        "News": "84",
        "MediaNews" : "143"
      },
      faqValue: ""
    };
  },
  methods: {
    handleCurrentChange(e) {
      let the = this;
      the.faqPage(e);
    },
    handleSizeChange(e) {
      let the = this;
      the.faqPage(e);
    },
    faqPage(e) {
      let the = this;
      e = e - 1;
      //文章列表
      http
        .fetchGet("/api/Article/Search", {
          args: { keyword: the.faqSearchValue, start: e*the.pageSize, limit: the.pageSize }
        })
        .then(data => {
          let datas = JSON.parse(data.data);
          if (datas.errcode) {
            var srcTop = new RegExp(the.faqSearchValue, "g");
            datas.result.search_results.map(obj => {
              obj.title = obj.title.replace(
                srcTop,
                `<span>${the.faqSearchValue}</span>`
              );
              obj.desc = obj.desc.replace(
                srcTop,
                `<span>${the.faqSearchValue}</span>`
              );
            });
            the.searchData = datas.result.search_results;
            the.totalNum = datas.result.total_count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    faqSearch() {
      let the = this;
      if (the.faqSearchValue=='') {
        this.$confirm('请输入搜索关键字', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        });
        return false;
      }
      the.faqValue = the.faqSearchValue;
      the.$router.push("/search?value=" + the.faqSearchValue);
      the.faqPage(1);
    }
  },
  mounted() {
    let the = this;
    let value = the.$route.query.value;
    the.faqSearchValue = value;
    the.faqValue = the.faqSearchValue;
    the.faqPage(1);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="../../assets/less/faq.less"></style>
<style>
.searchContent > ul li h2 span {
  font-size: 15.5px;
  color: red;
  font-style: normal;
  font-weight: 600;
}
.searchContent > ul li div span {
  font-size: 14px;
  color: red;
  font-style: normal;
  font-weight: 600;
}
</style>
