import { reqSearch } from "@/api"



const actions = {
    async getSearchList({commit},value){
        let resolve =  await reqSearch(value)
        if(resolve.code === 200){
            commit('CEARTESEARCHLIST',resolve.data);
        }
    }
}

const mutations = {
    CEARTESEARCHLIST(state,value){
        state.searchList = value
    }
}

const state = {
    searchList:{}
}
const getters = {
    attrsList(state){
        try {
            return state.searchList.attrsList.slice(0,6)||[]
        } catch (error) {
            
        }
       
    },
    goodsList(state){
        return state.searchList.goodsList||[]
    },
    pageNo(state){
        return state.searchList.pageNo
    },
    pageSize(state){
        return state.searchList.pageSize
    },
    total(state){
        return state.searchList.total
    },
    totalPages(state){
        return state.searchList.totalPages
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
}


export default {
    actions,
    mutations,
    state,
    getters
}