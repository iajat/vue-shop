import {reqCategoryList,reqGetBanner,reqGetFloor} from '@/api'



const actions = {
    async categoryList({commit}){
        let resolve =  await reqCategoryList()
        if(resolve.code === 200){
            commit("CEARTECATEGORY",resolve.data.slice(0,16))
        }
    },
    async getBanner({commit}){
        let resolve = await reqGetBanner();
        if(resolve.code === 200){
            commit("CEARTEBANNER",resolve.data)
        }
    },
    async getFloor({commit}){
        let resolve = await reqGetFloor();
        if(resolve.code === 200){
            commit("CEARTEFLOOR",resolve.data)
        } 
    }
}

const mutations = {

    CEARTECATEGORY(state,value){
        state.categoryList = value
    },
    CEARTEBANNER(state,value){
        state.bannerList = value
    },
    CEARTEFLOOR(state,value){
        state.floorList = value
    },
}

const state = {
    categoryList:[],
    bannerList:[],
    floorList:[],
}
const getters = {
}


export default {
   // namespace:home,
    actions,
    mutations,
    state,
    getters
}