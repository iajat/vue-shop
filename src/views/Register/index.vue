<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" @change="isEnter(phone)" placeholder="请输入你的手机号" v-model="phone" />
        <span v-show="isPhone" class="error-msg">手机号非法</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" />
        <button
          style="width: 100px; height: 38px; margin-left: 10px"
          @click="getCode"
        >
          获取验证码
        </button>
        <span v-show="false" class="error-msg">验证码错误</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          v-model="password"
          type="password"
          placeholder="请输入你的登录密码"
        />
        <span v-show="isPassword" class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          v-model="enterpassword"
          type="password"
          placeholder="请输入确认密码"
        />
        <span v-show="password!=enterpassword"  class="error-msg">两次密码不一致</span>
      </div>
      <div class="controls">
        <input v-model="agreement" name="m1" type="checkbox" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span v-show="!agreement" class="error-msg">请同意协议</span>
      </div>
      <div class="btn">
        <button @click="enterRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      isPhone: false,
      code: "",
      isCode: false,
      password: "",
      isPassword: false,
      enterpassword: "",
      agreement: false,
    };
  },
  methods: {
    isEnter(value){
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(value)) {
       this.isPhone=true
      }
    },
    async enterRegister() {
      if (this.agreement) {
        try {
          await this.$store.dispatch("userRegister", {
            phone: this.phone,
            code: this.code,
            password: this.password,
          });
          alert('注册成功')
          this.$router.push({name:'login'})
        } catch (error) {
          alert(error.message)
        }
      } else {
        alert("请确认协议");
      }
    },
    async getCode() {
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (reg.test(this.phone)) {
        
        try {
          await this.$store.dispatch("getCode", this.phone);
          this.code = this.$store.state.user.code;
        } catch (error) {}
      } else {
        alert('手机号格式不对')
      }
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
      .enter-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: rgb(76, 214, 110);
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>