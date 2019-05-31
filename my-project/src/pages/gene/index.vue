<template>
  <div class="gene-container">
    <van-tabs @change="clickTabs">
      <van-tab v-for="(item,index) in titleList" :key="index" :title="item.dictionary_name" class="tab-title">
        <block>
          <!--<span>{{item.dictionary_code}}</span>-->
          <div class="tab-content">
            <div v-for="(glist,index1) in geneList" :key="index1" class="dlist">
              <a @click="genecheck(glist)">
                <div class="pic">
                  <image :src="glist.img_url"></image>
                  <div class="desc">{{glist.title}}</div>
                  <div class="price">
                    <span class="unit">￥</span>
                    <span class="num1">{{glist.price}}</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </block>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        titleList:[],
        closevalue:[],
        pageTotal:'',
        geneList:[],
        pageIndex:0,
        pageCount:8,
        typeCloseValue:0
      }
    },
    methods: {
      clickTabs(event) {
        console.log(11111)
        this.typeCloseValue = event.mp.detail.index
        let that = this;
        this.$flyhttp.post({
          url: 'https://dev-ys.pharmacodia.com/yaoshen/genetic/getGeneticCloseTypeList',
          params:{
            typeCloseValue: 1,
            testType: 1,
            pageIndex:this.pageIndex,
            pageCount:this.pageCount
          }
        }).then(res => {
          if(res.status == '200'){
            that.pageTotal=res.data.data.totalPage;
            let obj=res.data.data.pagelist;
            obj.forEach(function (val,index) {
              that.geneList.push(val);
              //console.log(that.geneList)
            })
          }
        })
        //console.log(event.mp.detail.index)
      },
      genecheck(item){
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
    mounted () {
      wx.setNavigationBarTitle({
        title: '基因检测产品'
      })
      let that = this
      this.$httpWX.get({
        url: '/yaoshen/genetic/getGeneticTypeCloseValue'
      }).then(res => {
        console.log(res)
        if(res.code ==  '200'){
          //console.log(res.data.geneticTestType)
          that.titleList = res.data.geneticTestType
          that.closevalue = res.data.closevalue
        }
      })
      this.$flyhttp.post({
        url: 'https://dev-ys.pharmacodia.com/yaoshen/genetic/getGeneticCloseTypeList',
        params:{
          typeCloseValue: 1,
          testType: 1,
          pageIndex:this.pageIndex,
          pageCount:this.pageCount
        }
      }).then(res => {
        if(res.status == '200'){
          that.pageTotal=res.data.data.totalPage;
          let obj=res.data.data.pagelist;
          obj.forEach(function (val,index) {
            that.geneList.push(val);
            //console.log(that.geneList)
          })
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  .gene-container{
    background: #f3f5f7;
  }
  .tab-title{
    white-space:nowrap;
  }
  .tab-content{
    margin-top:20rpx;
    .pic{
      float: left;
      border-radius:6rpx;
      margin-bottom: 20rpx;
      background-color: #fff;
    }
    image{
      width: 350rpx;
      height: 350rpx;
      border-radius:6rpx 6rpx 0 0;
    }
    .dlist:nth-child(odd) .pic{
      margin-left: 20rpx;
    }
    .dlist:nth-child(even) .pic{
      margin-left: 20rpx;
    }
    .dlist:last-child .pic{
      margin-bottom: 200rpx;
    }
    .desc{
      font-size: 30rpx;
      color: #333;
      margin: 2rpx;
      width: 350rpx;
      line-height: 45rpx;
      word-wrap:break-word;
      clear: both;
      min-height: 45rpx;
      max-height: 90rpx;
      margin-left:4rpx;
      display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
      -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
      overflow: hidden;
      text-overflow: ellipsis; /* 溢出用省略号*/
      -webkit-box-orient: vertical;/*伸缩盒子的子元素排列：从上到下*/
    }
    .price{
      color: #ff4000;
      margin: 0 0 2rpx 2rpx;
      vertical-align:bottom;
      padding-left:4rpx;
      .unit{
        font-size: 26rpx;
        margin-right: 4rpx;
        vertical-align:middle;
      }
    }
  }
</style>
