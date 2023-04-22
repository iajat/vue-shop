import { resGetGoodsInfo,reqAddOrUpdateCart } from '@/api'
//生成一个UUID，唯一的
import {getUUID} from '@/utils/index'

const actions = {
    async getGoodsList({ commit }, value) {
        let resolve = await resGetGoodsInfo(value)
        if (resolve.code == 200) {
            commit('GETGOODSLIST', resolve.data)
        }

    },
    async AddOrUpdataCart({ commit },{skuId,skuNum}) {
        let resolve = await reqAddOrUpdateCart(skuId,skuNum)
        if(resolve.code==200){
            return "添加成功"
        }else{
            return Promise.reject(new Error('添加失败'))
        }
        
    }
}
const mutations = {
    GETGOODSLIST(state, value) {
        state.goodInfo = value
    }
}
const state = {
    uuid_token:getUUID(),
    goodInfo: {}
}
const getters = {
    categoryView(state) { return state.goodInfo.categoryView || {} },
    price(state) { return state.goodInfo.price },
    skuInfo(state) { return state.goodInfo.skuInfo || {} },
    valuesSkuJson(state) { return state.goodInfo.valuesSkuJson },
    spuSaleAttrList(state){return state.goodInfo.spuSaleAttrList}

}

export default {
    actions,
    mutations,
    state,
    getters,
}