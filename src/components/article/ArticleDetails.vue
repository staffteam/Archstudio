<template>
  <div id="articles">
    <el-image class="streamer" :src="streamerUrl" fit="scale-down"></el-image>
    <!-- 搜索 -->
    <div id="homeSearch">
      <div class="l">
        <span>热门搜索关键词：</span>
        <a :href="`/search?value=${item.name}`" v-for="(item,index) in searchData" :key="index" >{{item.name}}</a>
      </div>
      <div class="r">
        <p>
          <input type="search" />
          <i class="el-icon-search"></i>
        </p>
      </div>
    </div>
    <div class="articlelist border1">
      <div class="l">
        <div class="content">
          <div class="title">
            <h2>{{detailsData.title}}</h2>
            <p>
              <span>
                <i class="el-icon-time"></i>
                {{detailsData.date}}
              </span>
              <span>
                <i class="el-icon-view"></i>
                {{detailsData.stat}}
              </span>
            </p>
          </div>
          <div class="detailsBody" v-html="detailsData.content">{{detailsData.content}}</div>
          <div class="detailsNext">
            <a
              :href="`/articleDetails/${parentid}/${detailsData.prev_article!=null?detailsData.prev_article.article_id+'.html':'javascript:'}`"
              :class="detailsData.prev_article!=null?'':'not'"
            >上一页：{{detailsData.prev_article!=null?detailsData.prev_article.title:'没有了'}}</a>
            <a
              :href="`/articleDetails/${parentid}/${detailsData.next_article!=null?detailsData.next_article.article_id+'.html':'javascript:'}`"
              :class="detailsData.next_article!=null?'':'not'"
            >上一页：{{detailsData.next_article!=null?detailsData.next_article.title:'没有了'}}</a>
          </div>
        </div>
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
              <a :href="`/articleDetails/${parentid}/${item.article_id}.html`" >
                <h2>{{item.title}}</h2>
                <p>{{item.date}}</p>
              </a>
            </li>
          </ul>
        </div>
        <div class="recommen">
          <div class="title">热门标签</div>
          <ul class="labelContent">
            <li v-for="item in labelData" :key="item.id">
              <a :href="`/search?value=${item.name}`" >
                <h2>{{item.name}}</h2>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bottomRecommen">
      <h2>热门推荐</h2>
      <ul>
        <li v-for="item in articleData" :key="item.article_id">
          <a :href="`/articleDetails/${parentid}/${item.article_id}.html`" >
            <p class="listImg">
              <img :src="item.img_url"  :alt="item.img_alt" />
            </p>
            <div class="listContent">
              <h2>{{item.title}}</h2>
              <p>
                <span>
                  <i class="el-icon-time"></i>
                  {{item.date}}
                </span>
              </p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import http from "@/http.js";
export default {
  name: "articles",
  data() {
    return {
      streamerUrl: '',
      searchData: [],
      parentid: "",
      detailsData: [],
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
      navcodes: {
        "80": "Welfare",
        "81": "Hair",
        "82": "Guide",
        "84": "News",
        "143": "Media"
      },
      recommenData: [],
      detailsBody: "",
      labelData: [],
      parentid:'',
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
  mounted() {
    let the = this;
    the.parentid = the.$route.params.parentid;
    let  paramsId = the.$route.params.id.replace(/.html/g,'');
    if(isNaN(Number(paramsId))){
      return false;
    }
    //seo
    http
      .fetchGet("/api/Home/MenuDetail", { id: 84 })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.metadata = {
            name: datas.result.web_title,
            seo_words: datas.result.seo_words,
            seo_desc: datas.result.seo_desc
          };
         the.streamerUrl = datas.result.img_url?http.path + "/" + datas.result.img_url:require("@/assets/images/streamer_faq.png");
        }
      })
      .catch(err => {
        console.log(err);
      });
    //文章详情
    http
      .fetchGet("/api/Article/ArticleDetail", {
        id: the.$route.params.id.replace(/.html/g,'')
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.detailsData = datas.result;
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
          NavCode: the.navcodes[the.$route.params.parentid],
          IsRecommend:true
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.products.map(obj => {
            obj.img_url = http.path + "/" + obj.img_url;
          });
          the.recommenData=[];
          datas.result.products.forEach(function(value){
            if(value.article_id != the.$route.params.id.replace(/.html/g,'')){
              the.recommenData.push(value);
            }
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
      //热门推荐
    http
      .fetchGet("/api/Article/Articles", {
        args: {
          start: 0,
          limit: 5,
          sort: "sortorder asc,Hottime",
          dir: "desc",
          IsRelease: true,
          NavCode: the.navcodes[the.$route.params.parentid],
          IsHotRecommend:true,
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.products.map(obj => {
            obj.img_url = http.path + "/" + obj.img_url;
          });
          the.articleData=[];
          datas.result.products.forEach(function(value){
            if(value.article_id != the.$route.params.id.replace(/.html/g,'')){
              the.articleData.push(value);
            }
          })
          
        }
      })
      .catch(err => {
        console.log(err);
      });
    //热门标签
    http
      .fetchGet("/api/Article/Labels", {
        args: {
          start: 0,
          limit: 12,
          sort: "sortorder asc,typeid",
          dir: "desc",
          TypeCode: "Label"
        }
      })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.map(obj => {
            obj.img_url = http.path + "/" + obj.img_url;
          });
          the.labelData = datas.result;
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
    //导航分类
    http
      .fetchGet("/api/Article/MenuArticle")
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.map((obj, index) => {
            if (the.$route.params.parentid == obj.menu_id) {
              obj.on = "on";
            }
            if (!the.$route.params.parentid) {
              obj.on = index == 0 ? "on" : "";
            }
          });
          the.articleNavData = datas.result;
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
