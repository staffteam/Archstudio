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
        <div
          :class="isNavBtnShow?'wapListBtn show':'wapListBtn hide'"
          @click="isNavBtnShow = !isNavBtnShow"
        >
          <i :class="isNavBtnShow?'el-icon-d-arrow-left':'el-icon-d-arrow-right'"></i>
        </div>
        <div :class="isNavBtnShow?'l show':'l hide'">
          <h2>常见问题分类</h2>
          <ul>
            <li v-for="(item,index) in faqNavData" :key="index" :class="item.isCheck?'on':''">
              <a href="javascript:" :data-id="item.id" :data-index="index" @click="faqNavClick">
                <h2>
                  {{item.name}}
                  <i :class="item.isCheck?'el-icon-caret-top':'el-icon-caret-bottom'"></i>
                </h2>
              </a>
              <el-collapse-transition>
                <div v-show="item.isCheck">
                  <div v-for="(the,i) in item.childrens" :key="i">
                    <a
                      href="javascript:"
                      :class="the.isCheck?'on':''"
                      :data-id="the.id"
                      :data-parentId="item.id"
                      :data-index="i"
                      @click="faqNavListClick"
                    >
                      <h2>{{the.name}}</h2>
                    </a>
                  </div>
                </div>
              </el-collapse-transition>
            </li>
          </ul>
        </div>
        <div class="searchContent" v-if="faqListData.length==0">
          <h2>关于“{{searchValue}}”，共找到{{totalNum}}条相关问题</h2>
          <ul>
            <li v-for="(item,index) in searchData" :key="index">
              <a
                :href="`/faqDetails/${item.parent_type_id}/${item.type_id}/${item.id}.html`"
              >
                <h2 v-html="item.title">{{item.title}}</h2>
                <div v-html="item.desc">{{item.desc}}</div>
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
        <div class="searchContent" v-if="faqListData.length>0">
          <ul>
            <li v-for="(item,index) in faqListData" :key="index">
              <a
                :href="`/faqDetails/${item.parent_type_id}/${item.type_id}/${item.article_id}.html`"
              >
                <h2 v-html="item.title">{{item.title}}</h2>
                <div>{{item.desc}}</div>
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
      streamerUrl: require("@/assets/images/streamer_faq.png"),
      faqNavData: [],
      weimg: require("@/assets/images/code.png"),
      linkData: [],
      articlesContent: "",
      faqTitle: "",
      faqContent: "",
      faqDate: "",
      faqStat: "",
      faqSearchValue: "",
      searchValue: "",
      faqId: "",
      faqTheId: "",
      totalNum: 0,
      indexNum: 0,
      pageSize: 6,
      searchData: [],
      faqListData:[],
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
        .fetchGet("/api/Article/SearchFaq", {
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
    faqNavClick(e) {
      let the = this;
      let id = e.currentTarget.dataset.id;
      let i = e.currentTarget.dataset.index;
      the.faqNavData.map((value, index) => {
        value.isCheck = index == i;
        return value;
      });
    },
    faqNavListClick(e) {
      let the = this;
      let id = e.currentTarget.dataset.id;
      let parentId = e.currentTarget.dataset.parentid;
      let i = +e.currentTarget.dataset.index;
      var _i = +e.currentTarget.parentElement.parentElement
        .previousElementSibling.dataset.index;
      the.faqNavData.map((value, index) => {
        if (index == _i) {
          value.childrens.map((obj, key) => {
            obj.isCheck = key == i;
            return obj;
          });
        } else {
          value.childrens.map((obj, key) => {
            obj.isCheck = false;
            return obj;
          });
        }
        return value;
      });
      //文章详情
      http
        .fetchGet("/api/Article/Faqs", {
          args: {
            sort: "sortorder asc,releasetime",
            dir: "desc",
            NavCode: "Faq",
            IsRelease: true,
            TypeID: id,
            ParentTypeID: parentId
          }
        })
        .then(data => {
          let datas = JSON.parse(data.data);
          if (datas.errcode) {
            the.faqListData = datas.result.products;
            the.totalNum = datas.result.total_count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
      the.faqPage(1);
    }
  },
  mounted() {
    let the = this;
    let value = the.$route.query.value;
    the.faqSearchValue = value;
    the.searchValue = value;
    the.faqPage(1);
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
    //常见问题分类
    http
      .fetchGet("/api/Article/FaqCategorys")
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          datas.result.map((value, index) => {
            value.isCheck = "";
            value.childrens.map((item, key) => {
              item.isCheck = "";
              return value;
            });
            return value;
          });
          the.faqNavData = datas.result;
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
