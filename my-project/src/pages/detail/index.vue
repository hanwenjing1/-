<template>
  <div>
    <div class="geneDetail">
      <wxParse :content='content'>
      </wxParse>
    </div>
    <div class="bottom">
      <div class="price">
        <span>￥</span>{{price}}
      </div>
      <div class="consultation" @click="openConfirm">
        <image src="/static/images/tel.png"></image>
        电话咨询
      </div>
    </div>
  </div>
</template>

<script>
  import wxParse from 'mpvue-wxparse'
  export default {
    data () {
      return {
        geneticId: '',
        content: '',
        price: '',
        phone: '18310729546'
      }
    },
    components: {
      wxParse
    },
    methods: {
      openConfirm () {
        let that = this;
        wx.showModal({
          title: '咨询药神客服',
          content: '您将使用本机拨打药渡联系电话',
          success: function(res) {
            if (res.confirm) {
              wx.makePhoneCall({
                phoneNumber: that.phone
              })
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    },
    onLoad (options) {
      this.geneticId = options.geneticId
    },
    mounted () {
      wx.setNavigationBarTitle({
        title: '产品详情'
      })
      let that = this;
      this.$flyhttp.post({
        url: 'https://dev-ys.pharmacodia.com/yaoshen/genetic/getGeneticDetail',
        params: {
          genetic_id: this.geneticId
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        console.log(res)
        if (res.status === 200) {
          that.price = res.data.data.price
          that.content = res.data.data.content
        }
      })
    }
  }
</script>

<style scoped>
  @import url("~mpvue-wxparse/src/wxParse.css");
  .geneDetail{
    font-size: 0;
    width: 96%;
    background-color: #fff;
    padding-bottom:4rem;
    padding:20rpx;
  }
  .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 998;
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 28rpx;
    box-shadow: 5px 0px 8px 1px #E9E9E9;
    display: flex;
  }
  .bottom .price {
    text-align: right;
    padding-right: .4rem;
    color: #FF3F00;
    font-size: .36rem;
    background: #fff;
    width:70%;
  }
  .bottom .consultation {
    width:30%;
    text-align: center;
    background-color: #3991f1;
    color: #fff;
  }
  .consultation image{
    height:50rpx;
    width:50rpx;
    margin-bottom:-10rpx;
  }
</style>
