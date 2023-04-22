<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 导航栏的面包屑 -->
            <li v-show="searchparams.categoryName" class="with-x">
              {{ searchparams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li v-show="searchparams.keyword" class="with-x">
              {{ searchparams.keyword }}<i @click="removeKeyWordName">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li v-show="searchparams.trademark" class="with-x">
              {{ trademark }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 属性的面包屑 -->
            <li
              v-for="(item, index) in searchparams.props"
              :key="index"
              class="with-x"
            >
              {{ item.split(":")[1] }}<i @click="removeAttrbute(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @getMarckattr="getMarckattr"
          @getAttrbute="getAttrbute"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isAsc == 0 }" @click="defaultDesc">
                  <a href="#">综合</a>
                </li>
                <li v-show="isDesc" :class="{ active: isAsc == 2 }">
                  <a href="#" @click="priceAsc">价格⬆</a>
                </li>
                <li v-show="!isDesc" :class="{ active: isAsc == 1 }">
                  <a href="#" @click="priceDesc">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`"
                      ><img v-lazy="item.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ item.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ item.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            @getPages="getPages"
            :pageNo="pageNo"
            :pageSize="pageSize"
            :total="total"
            :continues="5"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      isAsc: 0,
      isDesc: true,
      searchparams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "",
        pageNo: 1,
        pageSize: 5,
        props: [],
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },

  mounted() {
    Object.assign(this.searchparams, this.$route.query);
    this.getDate();
  },
  computed: {
    ...mapGetters(["goodsList", "pageNo", "pageSize", "total", "totalPages"]),
    trademark() {
      if (this.searchparams.trademark) {
        return this.searchparams.trademark.split(":")[1];
      }
    },
  },
  watch: {
    $route: {
      deep: true,
      handler(newValue) {
        this.searchparams = Object.assign(this.searchparams, this.$route.query);
        this.getDate();
        this.searchparams.category1Id = undefined;
        this.searchparams.category2Id = undefined;
        this.searchparams.category3Id = undefined;
      },
    },
  },
  methods: {
    //发请求
    getDate() {
      //合并参数
      this.$store.dispatch("getSearchList", this.searchparams);
    },
    //删除面包屑的标题
    removeCategoryName() {
      this.searchparams.categoryName = undefined;
      this.$route.query.categoryName = undefined;
      this.searchparams.category1Id = undefined;
      this.searchparams.category2Id = undefined;
      this.searchparams.category3Id = undefined;
      this.getDate();
    },
    //删除面包屑的名字
    removeKeyWordName() {
      this.searchparams.keyword = undefined;
      this.$route.query.keyword = undefined;
      this.getDate();
      this.$bus.$emit("removeKeyword");
    },
    //删除面包屑的属性
    removeTrademark() {
      this.searchparams.trademark = undefined;
      this.getDate();
    },
    removeAttrbute(index) {
      this.searchparams.props.splice(index, 1);
      this.getDate();
    },
    //自定义事件
    getMarckattr(data) {
      this.searchparams.trademark = `${data.tmId}:${data.tmName}`;
      this.getDate();
    },
    getAttrbute(id, name, value) {
      let props = `${id}:${value}:${name}`;
      if (this.searchparams.props.indexOf(props) == -1)
        this.searchparams.props.push(props);
      this.getDate();
    },

    getPages(data) {
      this.searchparams.pageNo = data;
      this.getDate();
    },
    //方法
    defaultDesc() {
      this.searchparams.order = "";
      this.isAsc = 0;
      this.getDate();
    },
    priceAsc() {
      this.searchparams.order = "2:asc";
      this.isAsc = 1;
      this.isDesc = !this.isDesc;
      this.getDate();
    },
    priceDesc() {
      this.searchparams.order = "2:desc";
      this.isAsc = 2;
      this.isDesc = !this.isDesc;
      this.getDate();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>