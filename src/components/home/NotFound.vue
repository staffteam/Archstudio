<template>
  <div class="publicNull gray-bg">
    <div class="middle-box text-center animated fadeInDown">
      <img class="error-img" :src="streamerUrl" />
      <div class="error-desc">
        <a href="/" class="btn mdbtn-color btn-primary m-t">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "undefineds",
  data() {
    return {
      streamerUrl: require("@/assets/images/404.png")
    };
  },
  mounted: function() {},
  methods: {}
};
</script>
<style scoped src="../../assets/style/404.css"></style>