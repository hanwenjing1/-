<template>
  <div class="my-wrap">
    <div class="my-header" @click="gomyInfos">
      <div class="my-pic">
        <image src="/static/my/default.png" v-if="defaultimg" class="my-photo"></image>
        <image :src="headimgurl" v-if="!defaultimg"></image>
      </div>
      <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1" class="gologin" v-if="isLogin">点击登录</button>
      <div class="my-nickname" v-if="!isLogin">{{nick_name}}</div>
    </div>
    <div class="content">
      <ul>
        <li class="my-item" @click="gomyInfos">
          <image class="icon" src="/static/my/my.png"></image>
          <div class="my-text">
            <span>基本信息</span>
            <image class="arrow" src="/static/my/iconNext.png"></image>
          </div>
        </li>
        <li class="my-item" @click="getLocation">
          <image class="icon" src="/static/my/map.png"></image>
          <div class="my-text">
            <span>地图选择</span>
            <image class="arrow" src="/static/my/iconNext.png"></image>
          </div>
        </li>
        <li>{{data.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        headimgurl:'',
        nick_name:'',
        defaultimg:true,
        isLogin:true,
        data: {
          name: '',
          address: '',
          latitude: '',
          longitude: ''
        }
      }
    },
    methods:{
      getSetting () {
        let that = this
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res) {
                  that.isLogin = false
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
        if (wx.canIUse('button.open-type.getUserInfo')) {
        } else {
          console.log('请升级微信版本')
        }
      },
      bindGetUserInfo (e) {
        if (e.mp.detail.rawData) {
          this.getSetting()
          console.log('用户按了允许授权按钮')
        } else {
          console.log('用户按了拒绝按钮')
        }
      },
      gomyInfos() {
        wx.navigateTo({
          url: '/pages/message/main'
        })
      },
      getLocation () {
        let that = this
        wx.getSetting({
          success: function (e) {
            let userLocation = e.authSetting["scope.userLocation"];
            if (typeof(userLocation) == "undefined") {
              wx.getLocation({
                type: 'wgs84',
                success: res => {
                  console.log(res.latitude, res.longitude)
                  //that.getCityInfo(res.latitude, res.longitude)
                }
              })
            } else {
              that.getLocations()
            }
          }
        })
      },
      getLocations() {
        let that = this;
        wx.getSetting({
          success: function (e) {
            if (e.authSetting["scope.userLocation"] == true) {
              wx.getLocation({
                type: 'gcj02',
                success(res) {
                  wx.chooseLocation({
                    success: function (res) {
                      that.data.name = res.name
                      that.data.address = res.address
                      that.data.latitude = res.latitude
                      that.data.longitude = res.longitude
                      console.log(that.data.name,that.data.address)
                    }
                  })
                }
              })
            }
          }
        })
      }
    },
    mounted(){
      wx.login({
        success (res) {
          if (res.code){
            console.log(res)
//            wx.request({
//              url: 'test.php', //接口地址
//              data: {code:res.code},
//              header: {
//                'content-type': 'application/json' //默认值
//              },
//              success: function (res) {//换取openid和session_key
//                console.log(res.data)
//              }
//            })
          }
        },
      })
      this.$httpWX.get({
        url: '/yaoshen/user/getUserInfoById?id=7ef33070-b974-4d86-bbc9-1d1f54b46c27'
      }).then(res => {
        if(res.code === '200'){
          this.defaultimg = false
          this.headimgurl = res.data.headimgurl
          this.nick_name = res.data.nick_name
        }
      })
      wx.setNavigationBarTitle({
        title: '我的'
      })
    }
  }
</script>


<style lang="less" scoped>
  .my-wrap .my-header {
    width: 100%;
    height: 300rpx;
    background: url(../../../static/my/myHeaderBg.jpg) no-repeat center top;
    text-align: center;
  }
  .my-header .gologin{
    width:250rpx;
    background-color: transparent;
    font-size:40rpx;
  }
  .gologin::after {
    border: none;
  }
  .my-wrap .my-header .my-pic {
    display: inline-block;
    width: 100rpx;
    height: 100rpx;
    margin-top: 50rpx;
    position: relative;
    z-index: 0;
    align-items: center;
    overflow: hidden;
    border-radius: 50%;
  }

  .my-wrap .my-header .my-pic image {
    width:100%;
    height:100%;
    display:inline-block;
    object-fit: cover;
    background: #fff;
    -webkit-box-shadow: 0 0 0 .05rem rgba(255, 255, 255, .2);
    box-shadow: 0 0 0 .05rem rgba(255, 255, 255, .2);
    -webkit-border-radius: 50%;
  }

  .my-wrap .my-header .my-nickname {
    padding-top: 20rpx;
    font-size:40rpx;
  }

  .content {
    ul {
      li {
        height: 100rpx;
        weight: 100%;
        line-height: 100rpx;
        display: inlien-block;
        .icon {
          display: inline-block;
          width: 40rpx;
          height: 40rpx;
          padding-right: 20rpx;
          vertical-align: middle;
          padding-left: 10rpx;
        }
        .my-text {
          border-bottom:1px solid #e6e6e6;
          width: 90%;
          display: inline-block;
          font-size:34rpx;
        }
        .arrow {
          width: 30rpx;
          height: 40rpx;
          float: right;
          vertical-align: middle;
          display: inline-block;
          margin-top: 30rpx;
          padding-right: 10rpx;
        }
      }
    }
  }
</style>
