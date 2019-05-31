<template>
  <div class="containerbox">
    <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">获取权限</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      getSetting () {
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res) {
                  console.log(res.userInfo)
                  console.log('用户已经授权过')
                }
              })
            } else {
              console.log('用户还未授权过')
            }
          }
        })
      },
      getUserInfo1 () {
        // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
        // console.log(wx.canIUse('button.open-type.getUserInfo'))
        if (wx.canIUse('button.open-type.getUserInfo')) {
          // 用户版本可用
        } else {
          console.log('请升级微信版本')
        }
      },
      bindGetUserInfo (e) {
        if (e.mp.detail.rawData) {
          console.log('用户按了允许授权按钮')
        } else {
          console.log('用户按了拒绝按钮')
        }
      },
    },
    created () {
      this.getSetting()
    },
    mounted () {}
  }
</script>

<style scoped>
  .containerbox ul{
    padding:10px;
  }
  .containerbox ul li{
    height:100px;
    width:100%;
    display:flex;
    margin-top:10px;
  }
  .containerbox ul li img{
    height:100px;
    flex:1;
  }
  .containerbox ul li p{
    flex:1;
  }
</style>
