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
        <div class="searchContent" v-if="faqTitle==''">
          <ul>
            <li v-for="(item,index) in faqListData" :key="index">
              <a :href="`/faqDetails/${item.parent_type_id}/${item.type_id}/${item.article_id}.html`">
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
      streamerUrl: '',
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
      faqListId: "",
      faqListPId: "",
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
      the.faqListId = id;
      the.faqListPId = parentId;
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
    }
  },
  mounted() {
    let the = this;
    let _id = "";
    let _id_ = "";
    let ids = the.$route.query.id;
    let pids = the.$route.query.parentid;
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
            if (!pids) {
              value.isCheck = index == 0 ? "on" : "";
            } else {
              value.isCheck = value.id == pids ? "on" : "";
            }
            if (!ids) {
              if (index == 0) {
                _id = value.id;
                value.childrens.map((item, key) => {
                  item.isCheck = key == 0 ? "on" : "";
                  _id_ = item.id;
                  return value;
                });
              } else {
                value.childrens.map((item, key) => {
                  item.isCheck = "";
                  return value;
                });
              }
            } else {
              if (value.id == pids) {
                value.childrens.map((item, key) => {
                  item.isCheck = item.id == ids ? "on" : "";
                  return value;
                });
              } else {
                value.childrens.map((item, key) => {
                  item.isCheck = "";
                  return value;
                });
              }
            }

            return value;
          });
          the.faqNavData = datas.result;
          //文章详情
          http
            .fetchGet("/api/Article/Faqs", {
              args: {
                sort: "sortorder asc,releasetime",
                dir: "desc",
                NavCode: "Faq",
                IsRelease: true,
                TypeID: ids || _id_,
                ParentTypeID: pids || _id
              }
            })
            .then(data => {
              let datas = JSON.parse(data.data);
              if (datas.errcode) {
                the.faqListId = ids || _id;
                the.faqListPId = pids || _id;
                the.faqListData = datas.result.products;
                the.totalNum = datas.result.total_count;
              }
            })
            .catch(err => {
              console.log(err);
            });
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
