<template>
  <div>
    <div id="headers" :class="isNav?'on':'off'">
      <el-row class="black-head">
        <p class="logo">
          <img :src="logoUrl" alt />
        </p>
        <div v-if="isWap" id="wapBtn" :class="isNav?'on':'off'" @click="wapNavBtn">
          <p class="on">
            <i class="el-icon-minus"></i>
            <i class="el-icon-minus"></i>
            <i class="el-icon-minus"></i>
          </p>
          <p class="off">
            <i class="el-icon-close"></i>
          </p>
        </div>
        <div class="wapnav" :class="isNav?'on':'off'">
          <el-image class="navLogo" v-if="isWap" :src="logoUrl" fit="scale-down"></el-image>
          <ul class="nav">
            <li v-for="(item,index) in navData" :key="index" >
              <a :href="navList[item.menu_id]" :data-id="item.menu_id" :class="`${locationHref.length>=4?locationHref[3]==''?index==0?'navThe':'':locationHref[3].indexOf(navList[item.menu_id].split('/')[1])==0?'navThe':'':''}`">
                <h2>{{item.name}}</h2>
                <p>{{item.name_en}}</p>
              </a>
            </li>
          </ul>
        </div>
      </el-row>
    </div>
    <div v-if="isWap" class="wapHeight"></div>
  </div>
</template>

<script>
import http from "@/http.js";

export default {
  name: "headers",
  data() {
    return {
      logoUrl: require("@/assets/images/logo.png"),
      navData: [],
      locationHref:'',
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
      isWap: false,
      isNav: true
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    windowResize() {
      document.getElementsByTagName("html")[0].style.fontSize =
        document.documentElement.clientWidth / 32 + "px";
    },
    wapNavBtn(e) {
      this.isNav = !this.isNav;
      document.getElementsByTagName("body")[0].style.left = !this.isNav
        ? "-150px"
        : "0";
    }
  },
  mounted() {
    var the = this;
    the.locationHref = location.href.split('/');
    the.isWap = window.innerWidth < 800;
    the.windowResize();
    window.onresize = () => {
      the.windowResize();
    };
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" src="../../assets/less/header.less"></style>
