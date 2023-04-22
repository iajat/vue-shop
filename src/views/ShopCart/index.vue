<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in CartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              @change="ChangeChecked(item.skuId, $event)"
              :checked="item.isChecked"
              name="chk_list"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{ item.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a @click="handler('mins', -1, item)" class="mins">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value, item)"
            />
            <a @click="handler('add', 1, item)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum ,}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="delCart(item.skuId)">删除</a>
            <br />
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          :checked="chooseAll && CartInfoList.length > 0"
          @click="isChecked"
          type="checkbox"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="removeAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>{{isCheckedNumber}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalprice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="goTrade" >结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { throttle } from "lodash";
export default {
  name: "ShopCart",
  data() {
    return {
      timer:'',
      isCheckedNumber:0
    };
  },
  mounted() {
    this.getDate();
  },
  methods: {
    getDate() {
      this.$store.dispatch("getCartList");
    },
    async delCart(skuid) {
      try {
        await this.$store.dispatch("DelCart", skuid);
        this.getDate();
      } catch (error) {
        alert(error.message);
      }
    },
    async ChangeChecked(id, $event) {
      let isChecked = $event.target.checked ? "1" : "0";
      await this.$store.dispatch("ChangeChecked", { skuID: id, isChecked });
      this.getDate();
    },
    /* handler(type, num, sku) {
      if (type == "mins") {
        num = sku.skuNum > 1 ? -1 : 0;
      }

      try {
        this.$store.dispatch("AddOrUpdataCart", {
          skuId: sku.skuId,
          skuNum: num,
        });
        this.getDate();
      } catch (error) {}
    }, */
    handler: throttle(async function (type, num, sku) {
      if (type == "mins") {
        num = sku.skuNum > 1 ? -1 : 0;
      }
      if (type == "change") {
        if (isNaN(num) || num < 1) {
          num = 0;
        } else {
          num = parseInt(num) - sku.skuNum;
        }
      }
      try {
        await this.$store.dispatch("AddOrUpdataCart", {
          skuId: sku.skuId,
          skuNum: num,
        });
        this.getDate();
      } catch (error) {}
    }, 1000),
    async removeAllChecked() {
      try {
        await this.$store.dispatch("removeAllChecked");
        this.getDate();
      } catch (error) {
        alert(error.massge);
      }
    },
    isChecked(event) {
      clearTimeout(this.timer);
      
      this.timer = setTimeout( async () => {
        try {
          await this.$store.dispatch("isCheckedOn", event.target.checked);
          this.getDate();
        } catch (error) {}
      }, 300);
    },
    goTrade(){
      this.$router.push("trade")
    },
  },

  computed: {
    ...mapGetters(["CartInfoList"]),
    totalprice() {
      let sum = 0;
      this.CartInfoList.forEach((element) => {
        if (element.isChecked) {
          sum += element.skuPrice * element.skuNum;
        }
      });
      return sum;
    },
    chooseAll: {
      get() {
/*         return this.CartInfoList.every((element) => {
          //方法一，使用every
          return element.isChecked == 1;
        }); */
        let sum =  this.CartInfoList.reduce((acc,cur)=>{  //方法二，rudecu计数，方法三fillter（不想写了）
          return cur.isChecked?acc+=1:acc
        },0)
        this.isCheckedNumber=sum
        if(sum==this.CartInfoList.length) return 1;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
        margin-left: -150px;
        margin-right: 150px;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;
          margin-right: 20%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;
      
      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;
      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>