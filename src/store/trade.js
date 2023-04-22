import {reqGetUserAddress,reqGetOrderInfo} from '@/api'

const actions = {
    async getUserAddress({commit}){
        let resolve =  await reqGetUserAddress()
        if(resolve.code === 200){
            commit("CREATEUSERADDRESS", resolve.data)
        }
    },
    async reqGetOrderInfo({commit}){
        let resolve =  await reqGetOrderInfo()
        if(resolve.code === 200){
            commit("CREATEORDERINFO", resolve.data)
        }
    }
}

const mutations={
    CREATEUSERADDRESS(state,value){
        state.userAddress = value
    },
    CREATEORDERINFO(state,value){
        state.orderInfo=value
    }
}

const state = {
    userAddress:[],
    orderInfo:{},
}

const getters = {
    
}

export default {
    actions,
    mutations,
    state,
    getters
}