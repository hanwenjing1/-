<template>
  <div class="home_container">
    <swiper class="swiper" v-if="swipeList.length > 0" indicator-dots="true" autoplay="true" interval="4000"
            duration="500">
      <block v-for="(item, index) in swipeList" :key="index">
        <swiper-item>
          <image :src="item.pic_path" mode="scaleToFill"></image>
        </swiper-item>
      </block>
    </swiper>
    <div class="genDiv">
      <div class="lev">
        <div class="lev-title">基因检测</div>
        <div class="more" @click="goList">更多</div>
      </div>
      <div class="gene">
        <div class="gene-item">
          <block v-for="item in gene" :key="index">
            <a @click="genecheck(item)">
              <img :src="item.img_url"/>
            </a>
          </block>
        </div>
      </div>
    </div>
    <!--<button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">获取权限</button>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        swipeList: [],
        gene: []
      }
    },
    onShareAppMessage: function (options) {
      return {
        title: '转发',
        //path: '/pages/index/index',
        desc: '药神',
        imageUrl: 'https://dev-rs.pharmacodia.com//manager-entrance/genetic9/YD-20190510103851967.jpg',
        success:function(res){
          console.log('成功',res)
        }
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
      goList() {
        wx.navigateTo({
          url: '/pages/gene/main'
        })
      },
      genecheck(item) {
        if (item.type === '1') {
          wx.navigateTo({
            url: '/pages/detail/main?geneticId=' + item.id
          })
        } else if (item.type === '2') {
          wx.navigateTo({
            url: '/pages/out/main?send_url=' + item.send_url
          })
        }
      }
    },
    mounted() {
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
        url: '/yaoshen/adv/listByPos?position=1'
      }).then(res => {
        if (res.code === '200') {
          this.swipeList = res.data
        }
      })
      this.$httpWX.get({
        url: '/yaoshen/genetic/getGeneticHomeList'
      }).then(res => {
        if (res.code === '200') {
          this.gene = res.data
          console.log(res)
        }
      })
      wx.showShareMenu({
        withShareTicket: true
      })
    }
  }
</script>

<style scoped lang="less">
  .swiper {
    height: 350 rpx;
    padding:0 20rpx;
  }
  .swiper image {
    height: 350rpx;
    width: 100%;
  }
  .genDiv{
    margin-top:20rpx;
  }
  .genDiv .lev {
    height: 70rpx;
    width: 100%;
    line-height: 70rpx;
    margin-top: 10rpx;
  }

  .genDiv .lev .lev-title {
    display: inline-block;
    padding-left: 20rpx;
  }
  .genDiv .lev .more {
    display: inline-block;
    float: right;
    padding-right: 20rpx;
    color: #3991f1;
  }
  .gene {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    text-align: center;
    margin-top: -.3rem;
    padding-bottom: .28rem;
    -webkit-transform: translateY(0.3rem) !important;
    transform: translateY(0.3rem);
  }
  .gene-item {
    margin: 0 .07rem .2rem .27rem;
    display: inline-block;
    white-space: nowrap;
  }
  .gene-item a {
    display: inline-block;
  }
  .gene-item img {
    width: 3.58rem;
    height: 1.98rem;
    margin-right: .2rem;
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
</style>

