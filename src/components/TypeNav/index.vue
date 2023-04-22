<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveshow" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>
        <transition>
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categorylist"
                :key="c1.categoryId"
                :class="{ cur: index == currentCategory }"
              >
                <h3
                  @mouseenter="changeindex(index)"
                  @mouseleave="currentCategory = -1"
                >
                  <a
                    :data-name="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-name="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-name="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { throttle } from "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      currentCategory: -1,
      show: true,
    };
  },
  methods: {
    leaveshow() {
      if (this.$route.path != "/home" && this.$route.path != "/") {
        this.show = false;
      }
    },
    entershow() {
      if (this.$route.path != "/home" && this.$route.path != "/") {
        this.show = true;
      }
    },
    /* changeindex(index){
      this.currentCategory = index
    } */
    //使用节流
    changeindex: throttle(function (index) {
      this.currentCategory = index;
    }, 50),
    goSearch(event) {
      let element = event.target.dataset;
      let isname = element.name;
      let category1Id = element.category1id;
      let category2Id = element.category2id;
      let category3Id = element.category3id;

      if (isname) {
        let q = {keyword:this.$route.query.keyword};
        if (category1Id) {
          this.$router.push({
            name: "search",
            query: { ...q, category1Id: category1Id, categoryName: isname },
          });
          
        } else if (category2Id) {
          this.$router.push({
            name: "search",
            query: { ...q, category2Id: category2Id, categoryName: isname },
          });
          
        } else {
          this.$router.push({
            name: "search",
            query: { ...q, category3Id: category3Id, categoryName: isname },
          });
          
        }
      }
    },
  },

  mounted() {
    if (this.$route.path != "/home" && this.$route.path != "/") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categorylist: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .cur {
          background: skyblue;
        }
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
    .v-enter {
      height: 0;
    }
    .v-enter-to {
      height: 461px;
    }
    .v-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>