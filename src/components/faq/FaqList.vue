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
      <div class="rd">
        <div class="content">
          <h2>热点问题</h2>
          <div class="rdNav">
            <ol>
              <li
                v-for="item in faqNavData"
                :key="item.id"
                :class="item.on"
                @click="faqNavCLick($event,item.id)"
              >{{item.name}}
              <i class="el-icon-caret-bottom" v-if="item.on=='on'" ></i>
              </li>
            </ol>
            <div>
              <ul>
                <li v-for="the in faqData" :key="the.article_id">
                  <a
                    :href="`/faqDetails/${the.parent_type_id}/${the.type_id}/${the.article_id}.html`"
                  >· {{the.title}}</a>
                </li>
              </ul>
            </div>
          </div>
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
      streamerUrl: require("@/assets/images/streamer_faq.png"),
      faqNavData: [],
      weimg: require("@/assets/images/code.png"),
      articlesContent: "",
      faqTitle: "",
      faqContent: "",
      faqDate: "",
      faqStat: "",
      faqSearchValue: "",
      searchValue: "",
      faqId: "",
      faqTheId: "",
      faqData: [],
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
    faqSearch() {
      let the = this;
      if (the.faqSearchValue == "") {
        this.$confirm("请输入搜索关键字", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      the.searchValue = the.faqSearchValue;
      this.$router.push("/faqSearch?value=" + this.faqSearchValue);
    },
    getFaqData(e) {
      let the = this;
      //数据
      http
        .fetchGet("/api/Article/Faqs", {
          args: {
            sort: "sortorder asc,releasetime",
            dir: "desc",
            NavCode: "Faq",
            IsRelease: true,
            ParentTypeID: e
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
    faqNavCLick(obj, e) {
      let the = this;
      the.faqNavData.map((value, index) => {
        value.on = value.id == e ? "on" : "";
        return value;
      });
      the.getFaqData(e);
    }
  },
  mounted() {
    let the = this;
    //seo
    http
      .fetchGet("/api/Home/MenuDetail", { id: 144 })
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
    //分类
    http
      .fetchGet("/api/Article/FaqCategorys")
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.map((value, index) => {
            value.on = index == 0 ? "on" : "";
            return value;
          });
          the.faqNavData = datas.result;
          the.getFaqData(datas.result[0].id);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="../../assets/less/faq.less"></style>
