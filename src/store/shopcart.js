import { reqGetCartList, reqDelCart, reqChangeChecked } from '@/api'

const actions = {
    async getCartList({ commit }) {
        let resolve = await reqGetCartList()
        if (resolve.code == 200) {
            if (resolve.data.length != 0) {
                commit('CARTECARTLIST', resolve.data[0])
            } else {
                commit('CARTECARTLIST', [])
            }

        }
    },
    async DelCart({ commit }, value) {
        let resolve = await reqDelCart(value)
        if (resolve.code == 200) {
            return "删除成功"
        } else {
            return Promise.reject(new Error('filed'))
        }
    },
    async ChangeChecked({ commit }, { skuID, isChecked }) {
        let resolve = await reqChangeChecked(skuID, isChecked)
        if (resolve.code == 200) {
            return "成功"
        } else {
            return Promise.reject(new Error('filed'))
        }
    },
    removeAllChecked(context) {
        let promiseAll = []
        context.getters.CartInfoList.forEach(element => {
            let promise = element.isChecked == 1 ? context.dispatch("DelCart", element.skuId) : ''
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    },
    async isCheckedOn(context, value) {
        let promiseAll = []
        context.getters.CartInfoList.forEach(element => {
            let promise = value == true ?
                context.dispatch('ChangeChecked', { skuID: element.skuId, isChecked: '1' })
                :
                context.dispatch('ChangeChecked', { skuID: element.skuId, isChecked: '0' })
                promiseAll.push(promise)
        })
        return Promise.all(promiseAll)

    }

}



const mutations = {
    CARTECARTLIST(state, value) {
        state.CartList = value
    }
}
const state = {
    CartList: []
}
const getters = {
    CartInfoList(state) {
        return state.CartList.cartInfoList || []

    }
}

export default {
    actions,
    mutations,
    state,
    getters,
}