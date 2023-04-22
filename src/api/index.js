//当前这个模块：API进行统一管理

import request from "./request";
import mockRquest from "./mockAjax";

//三级联动接口
///api/product/getBaseCategoryList    get 无参数

/* export const reqCategoryList = ()=> request.get('/product/getBaseCategoryList').then(
    (res)=>{
        console.log(res);
    }
) */

export const reqCategoryList = () => request({ url: `/product/getBaseCategoryList`, methods: 'get' });
//发请求

export const reqGetBanner = () => mockRquest({ url: `/banner`, methods: 'get' });

export const reqGetFloor = () => mockRquest({ url: `/floor`, methods: 'get' });

// 获取search数据
//  export const reqSearch = (query) =>request.post('list',{data:query})
export const reqSearch = (params) => request({ url: "/list", method: "post", data: params });

export const resGetGoodsInfo = (skuId) => request({ url: `/item/${skuId}`, method: "get" })


//添加购物车
export const reqAddOrUpdateCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取购物车数据
export const reqGetCartList = () => request({ url: `/cart/cartList`, method: 'get' })
//删除购物车
export const reqDelCart = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })

//更改购物车状态
export const reqChangeChecked = (skuID, isChecked) => request({ url: `/cart/checkCart/${skuID}/${isChecked}`, method: 'get' })

//获取验证码

export const reqGetCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'get' })


//注册
export const reqUserRegister = (data) => request({ url: `/user/passport/register`, method: "post", data })
//登录 
export const reqUserLogin = (data) => request({ url: `/user/passport/login`, method: "post", data })

//获取用户信息
export const reqGetUserInfo = () => request({ url: `/user/passport/auth/getUserInfo`, method: 'get' })

//退出登录
export const reqLogOut = () => request({ url: `/user/passport/logout`, method: 'get' });

//用户地址信息
export const reqGetUserAddress = () => request({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' })

//商品清单
export const reqGetOrderInfo = () => request({ url: `/order/auth/trade`, method: 'get' });

//提交订单
export const reqSubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })

//获取支付信息
export const reqGetPayInfo = (orderId) => request({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

//获取支付状态
export const reqPayStatus = (orderId) => request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

//获取个人中心的数据/api/order/auth/{page}/{limit}

export const reqGetMyorderList = (page, limit) => request({ url: `/order/auth/${page}/${limit}`, method: 'get' })