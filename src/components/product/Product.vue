<template>
  <div id="product">
    <el-image class="streamer" :src="streamerUrl" fit="scale-down"></el-image>
    <div class="productList">
      <ul>
        <li v-for="item in productData" :key="item.product_id">
          <a :href="`/productDetails/${item.product_id}.html`">
            <el-image class="listImg" :src="item.img_url" :alt="item.img_alt" fit="scale-down"></el-image>
            <div class="listContent">
              <h2>{{item.name}}</h2>
              <div v-html="item.function">
                {{item.size}}
                <br />
                {{item.function}}
              </div>
              <span>查看详情+</span>
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
  </div>
</template>

<script>
import http from "@/http.js";
export default {
  name: "product",
  data() {
    return {
      streamerUrl: '',
      productData: [],
      totalNum: 0,
      indexNum: 0,
      pageSize: 6,
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
      the.productPage(e);
    },
    handleSizeChange(e) {
      let the = this;
      the.productPage(e);
    },
    productPage(e) {
      let the = this;
      e = e-1;
      //产品列表
      http
        .fetchGet("/api/Article/Products", {
          args: {
            start: e*the.pageSize,
            limit: the.pageSize,
            sort: "sortorder asc,releasetime",
            dir: "desc",
            IsRelease: true
          }
        })
        .then(data => {
          let datas = JSON.parse(data.data);
          if (datas.errcode) {
            datas.result.products.map(obj => {
              obj.img_url = http.path + "/" + obj.img_url;
            });
            the.productData = datas.result.products;
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
    the.productPage(1);
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
          the.streamerUrl = datas.result.img_url?http.path + "/" + datas.result.img_url:require("@/assets/images/streamer_product.png");
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
