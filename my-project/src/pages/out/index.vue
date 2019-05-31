<template>
  <!--<web-view :src="send_url"></web-view>-->
  <div>
    跳转外链页面
  </div>
</template>

<script>
  export default {
    data () {
      return {
        send_url: ''
      }
    },
    onLoad (options) {
      this.send_url = options.send_url
    }
  }
</script>
