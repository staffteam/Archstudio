<template>
  <div id="footers">
    <div class="grid-content bg-purple-dark">
      <div class="content">
        <div class="l">
          <el-image class="logo" :src="logoUrl" fit="scale-down"></el-image>
        </div>
        <div class="c">
          <p>
            <a href="http://www.beian.gov.cn/" target="_blank">{{wordSize}}</a>
          </p>
          <p>
            <a :href="`tel:${tel}`">热线电话：{{tel}}</a>
          </p>
          <p>
            <a :href="`mailto:${email}`">邮 箱：{{email}}</a>
          </p>
          <p>
            <a :href="`/sitemap`">网站地图</a>
          </p>
        </div>
        <div class="r">
          <el-image class="wechart" :src="wechart" fit="scale-down"></el-image>
          <h2>扫一扫更精彩！</h2>
        </div>
      </div>
    </div>
    <el-backtop>
      <el-image class="topImg" :src="topUrl" fit="scale-down"></el-image>
    </el-backtop>
    <div class="rightNav">
      <ul>
        <li class="w">
          <p>
            <img :src="rNavW" alt />
          </p>
          <h2>客户微信</h2>
          <div>
            <div>
              <p>
                <img :src="rNavWcode" alt />
              </p>
              <h2>扫描客户微信二维码</h2>
            </div>
          </div>
        </li>
        <li class="w">
          <p>
            <img :src="rNavW" alt />
          </p>
          <h2>官方微信</h2>
          <div>
            <div>
              <p>
                <img :src="rNavWcode" alt />
              </p>
              <h2>扫描官方二维码</h2>
            </div>
          </div>
        </li>
        <li class="t" @mouseover="show2=true" @mouseout="show2=false">
          <p>
            <img :src="rNavT" alt />
          </p>
          <h2>联系电话</h2>
          <div>
            <div>
              <p>热线电话</p>
              <h2>{{rNavTcode}}</h2>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import http from "@/http.js";
export default {
  name: "footers",
  data() {
    return {
      topUrl: require("@/assets/images/icon_top.png"),
      logoUrl: require("@/assets/images/logo.png"),
      wechart: require("@/assets/images/code.png"),
      wordSize: "",
      tel: "400-880-16112",
      email: "lexilisi@sina.com",
      rNavW: require("@/assets/images/icon_wechat.png"),
      rNavT: require("@/assets/images/icon_tel.png"),
      rNavWcode: "",
      rNavTcode: "",
    };
  },
  methods: {},
  mounted() {
    let the = this;
    //关于我们
    http
      .fetchGet("/api/Home/webinfo")
      .then(data => {
        let datas = JSON.parse(data.data);
        if (datas.errcode) {
          the.wechart = http.path + "/" + datas.result.wechat_img_url;
          the.tel = datas.result.tel;
          the.email = datas.result.email;
          the.wordSize = datas.result.copyright + " | " + datas.result.filing;
          the.logoUrl = http.path + "/" + JSON.parse(data.data).result.logo_url;
          the.rNavWcode = http.path + "/" + datas.result.wechat_img_url;
          the.rNavTcode = datas.result.tel;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="../../assets/less/footer.less"></style>
