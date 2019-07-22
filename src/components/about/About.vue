<template>
  <div id="about">
    <el-image class="streamer" :src="streamerUrl" fit="scale-down"></el-image>
    <div class="aboutTop">
      <h2>{{content}}</h2>
      <p>{{content_en}}</p>
    </div>
    <div class="aboutBottom">
      <div class="l">
        <ul>
          <h2>联系方式</h2>
          <li v-for="(item,index) in aboutData" :key="index">
            <a :href="item.url">
              <p>
                <img :src="item.imgUrl" :alt="item.img_alt" />
              </p>
              <h2>{{item.title}}</h2>
              <span>{{item.text}}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="r">
        <h2>{{wechat}}</h2>
        <p class="weimg">
          <img :src="weimg" />
        </p>
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
      streamerUrl: '',
      aboutData: [
        {
          url: "tel:17512840813",
          imgUrl: require("@/assets/images/icon_phone.png"),
          text: "17512840813",
          title: "热线电话"
        },
        {
          url: "mailto:lexilisi@sina.com",
          imgUrl: require("@/assets/images/icon_email.png"),
          text: "lexilisi@sina.com",
          title: "电子邮箱"
        },
        {
          url: "javascript:",
          imgUrl: require("@/assets/images/icon_wx.png"),
          text: "微信：llxls2016",
          title: "微信咨询"
        }
      ],
      weimg: require("@/assets/images/code.png"),
      content: "如有疑问或者想咨询乐喜力丝产品，请联系我们",
      wechat:'官方微信号',
      content_en:'If you have any questions or want to consult Lexillis products,please contact us.',
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
    //seo
    http
      .fetchGet("/api/Home/MenuDetail", { id: 50 })
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.metadata = {
            name: datas.result.web_title,
            seo_words: datas.result.seo_words,
            seo_desc: datas.result.seo_desc
          };
         the.streamerUrl = datas.result.img_url?http.path + "/" + datas.result.img_url:require("@/assets/images/streamer_about.png");
        }
      })
      .catch(err => {
        console.log(err);
      }); 
    //关于我们
    http
      .fetchGet("/api/Article/About")
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.weimg = http.path + "/" + datas.result.wechat_img_url;
          the.content = datas.result.content;
          the.content_en = datas.result.content_en;
          the.aboutData[0].url = "tel:" + datas.result.tel;
          the.aboutData[0].text = datas.result.tel;
          the.aboutData[1].url = "mailto:" + datas.result.email;
          the.aboutData[1].text = datas.result.email;
          
          the.email = datas.result.email;
          the.wechat = datas.result.wechat || '官方微信号';
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="../../assets/less/about.less"></style>
