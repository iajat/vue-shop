<template>
  <div class="pagination">
    <button @click="last" :disabled="pageNo == 1">上一页</button>
    <template>
      <button v-if="pageStartAndEnd.start > 1" @click="goOne">1</button>

      <button v-if="pageStartAndEnd.start > 2" @click="goToLast">···</button>
    </template>

    <button
      v-for="page in pageStartAndEnd.end"
      :key="page"
      v-if="page >= pageStartAndEnd.start"
      @click="goPage(page)"
    >
      {{ page }}
    </button>
    <template>
      <button v-if="pageStartAndEnd.end < pageTotal - 1" @click="goToNext">
        ···
      </button>
      <button @click="goLast" v-if="pageStartAndEnd.end < pageTotal">
        {{ pageTotal }}
      </button>
    </template>

    <button @click="next" :disabled="pageNo == pageTotal">下一页</button>
    <button style="margin-left: 30px">第 {{ pageNo }} 页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
  
<script>
export default {
  name: "Pagination",
  data() {
    return {};
  },
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总页数
    pageTotal() {
      if (this.total % this.pageSize == 0) {
        return this.total / this.pageSize;
      } else {
        return ((this.total / this.pageSize) >> 0) + 1;
      }
    },
    pageStartAndEnd() {
      let start,
        end = 0;
      if (this.continues > this.pageTotal) {
        start = 1;
        end = this.pageTotal;
      } else {
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        if (start <= 1) {
          (start = 1), (end = this.continues);
        }
        if (end > this.pageTotal) {
          start = this.pageTotal - this.continues + 1;
          end = this.pageTotal;
        }
      }
      start = start - 0;
      end = end - 0;
      return { start, end };
    },
  },
  methods: {
    last() {
      this.$emit("getPages", this.pageNo - 1);
    },
    next() {
      this.$emit("getPages", this.pageNo + 1);
    },
    goOne() {
      this.$emit("getPages", 1);
    },
    goToLast() {
      this.$emit("getPages", this.pageStartAndEnd.start-1);
    },
    goToNext() {
      this.$emit("getPages", this.pageStartAndEnd.end+1);
    },
    goLast() {
      this.$emit("getPages", this.pageTotal);
    },
    goPage(page){
        this.$emit("getPages", page);
    }
  },
};
</script>
  
  <style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
  