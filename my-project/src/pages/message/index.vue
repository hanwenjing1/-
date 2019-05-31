<template>
  <div>
    <div class="my-wrap">
      <div class="info-main">
        <ul>
          <li class="head-portrait" @click="chooseImage">
            <label class="head_text">头像</label>
            <div>
              <image src="/static/my/default.png" v-if="defaultimg"></image>
              <image :src="headimgurl" v-if="!defaultimg"></image>
            </div>
          </li>
          <li @click="editNickName" class="inner">
            <label class="head_text">用户昵称</label>
            <div>
              <input type="text" ref="nickName" placeholder="请输入您的昵称" v-model="nick_name">
            </div>
          </li>
          <li class="inner" @click="editRealName">
            <label class="head_text">姓名</label>
            <div>
              <input type="text" ref="realName" placeholder="请输入您的真实姓名" v-model="full_name">
            </div>
          </li>
          <li class="inner">
            <label class="head_text">性别</label>
            <div>
              <picker @change="sexChange" :value="sex" :range="sexObj">
                <view class="picker">
                  {{sexObj[sex]}}
                </view>
              </picker>
            </div>
          </li>
          <li class="inner">
            <label class="head_text">生日</label>
            <div>
              <picker @change="birthdayChange"
                      mode="date"
                      :value="birthday"
                      end="2217-09-01"
              >
                <view class="picker">
                  {{birthday}}
                </view>
              </picker>
            </div>
          </li>
          <li class="inner">
            <label class="head_text">地区</label>
            <div>
              <picker mode="region"
                      @change="regionChange"
                      :value="region"
                      :custom-item="customItem">
                <view class="picker">
                  {{region[0]}}，{{region[1]}}，{{region[2]}}
                </view>
                </picker>
            </div>
          </li>
        </ul>
      <button @click="save" class="save">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        files: [],
        headimgurl:'',
        nick_name:'',
        full_name:'',
        sex:1,
        birthday:'2018-02-21',
        defaultimg:true,
        sexObj:['未知','男','女'],
        region: ['广东省', '广州市', '海珠区'],
        customItem: '全部',
        addresschange:''
      }
    },
    methods: {
      regionChange: function (e) {
        this.region = e.mp.detail.value
        var str = this.region.join(',')
        this.addresschange = str
        console.log(this.addresschange)
      },
      sexChange (e) {
        this.sex = e.mp.detail.value
        console.log(e)
      },
      birthdayChange (e) {
        this.birthday = e.mp.detail.value
      },
      chooseImage() {
        let that = this
        let i = 0
        let upLength
        let imgFilePaths
        wx.chooseImage({
          count: 1,
          success: function (res) {
            let len = that.files.concat(res.tempFilePaths)
            imgFilePaths = res.tempFilePaths;
            upLength = imgFilePaths.length;
            wx.showLoading({
              title: '上传中...',
            })
            that.upLoad(imgFilePaths, i, upLength);
          },
          fail: function () {
            console.log('fail');
          },
          complete: function () {
            console.log('commplete');
          }
        })
      },
      upLoad(imgPath, i, upLength) {
        let that = this;
        wx.uploadFile({
          url: 'https://dev-ys.pharmacodia.com/yaoshen/file/uploadHeadImg',
          filePath: imgPath[i],
          name: 'file',
          header: {
            'Content-Type': 'multipart/form-data'
          },
          formData: {
            'userId': '7ef33070-b974-4d86-bbc9-1d1f54b46c27'
          },
          success: function (res) {
            that.files = that.files.concat(imgPath[i])
            let imgData = JSON.parse(res.data)
            that.defaultimg = false
            that.headimgurl = imgData.data.url
          },
          fail: function (res) {
            wx.showModal({
              title: '错误提示',
              content: '上传图片失败',
              showCancel: false,
              success: function (res) {
              }
            })
          },
          complete: function () {
            i++;
            if (i == upLength) {
              wx.hideLoading();
            } else {
              that.upLoad(imgPath, i, upLength);
            }
          }
        })
      },
      save(){
        this.$httpWX.get({//修改基本信息
          url: '/yaoshen/user/updUserInfoById',
          data:{
            id: '7ef33070-b974-4d86-bbc9-1d1f54b46c27',
            full_name:this.full_name,
            nick_name:this.nick_name,
            full_name:this.full_name,
            sex:this.sex,
            birthday:this.birthday,
            address:this.addresschange
          }
        }).then(res => {
          if(res.code === '200'){

          }
        })
      }
    },
    mounted() {
//      this.$httpWX.get({
//        url: '/yaoshen/user/saveUser?p='
//      }).then(res => {
//        console.log(res)
//      })
      this.$httpWX.get({//得到基本信息
        url: '/yaoshen/user/getUserInfoById?id=7ef33070-b974-4d86-bbc9-1d1f54b46c27'
      }).then(res => {
        if(res.code === '200'){
          this.defaultimg = false
          this.headimgurl = res.data.headimgurl
          this.nick_name = res.data.nick_name
          this.full_name = res.data.full_name
          this.sex = res.data.sex
          this.birthday = res.data.birthday
          var address = res.data.address
          this.region = address.split(',')
        }
      })
        wx.setNavigationBarTitle({
          title: '基本信息'
        })
    }
  }
</script>

<style lang="less" scoped>
  .my-wrap{
    width:100%;
    height:100vh;
    margin: 0 auto;
    box-sizing:border-box;
  }
  .info-main{
  .inner{
    display:flex;
    height:100rpx;
    line-height:100rpx;
    border-bottom:1px solid #e6e6e6;
  }
   label{
    flex:1;
    display:inline-block;
    width:200rpx;
    vertical-align: middle;
     padding-left:30rpx;
   }
  div{
    flex:2;
    text-align:right;
    vertical-align: middle;
    padding-right:20rpx;
    .picker{
      padding-right:30rpx;
    }
    input{
      height:80rpx;
      text-align:right;
      padding-right:30rpx;
    }
  }
  }
  .head-portrait{
    height:120rpx;
    line-height:120rpx;
    border-bottom:1px solid #e6e6e6;
  }
  .head-portrait div{
    width:100rpx;
    height:90rpx;
    float:right;
  }
  .head-portrait div image{
    width:100%;
    height:100%;
    border-radius:50%;
    display:inline-block;
  }
  .save{
    background: #3991f1;
    color:#fff;
    width:80%;
    margin-top:60rpx;
  }
</style>
