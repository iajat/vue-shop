import {reqGetCode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqLogOut} from '@/api/index'
import {setToken} from '@/utils/token'


const actions={
    //验证码
    async getCode({commit},phone){
        let resolve = await reqGetCode(phone)
        if(resolve.code == 200){
            commit('CREATECODE',resolve.data)
        }else{
            return Promise.reject(new Error('获取失败'));
        }
    },
    //注册
    async userRegister({commit},data){
        let resolve = await reqUserRegister(data)
        if(resolve.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error(resolve.message));
        }
    },
    //登录
    async userLogin({commit},data){
        let resolve = await reqUserLogin(data)
        if(resolve.code == 200){
            commit('USERTOKEN',resolve.data.token)
            setToken(resolve.data.token)
            return 'ok'
        }else{
            return  Promise.reject(new Error(resolve.message));
        }
    },
    async getUserInfo({commit}){
        let resolve = await reqGetUserInfo()
        if(resolve.code == 200){
            commit('GETUSERINFO',resolve.data)
            return 'ok'
        }else{
            return  Promise.reject(new Error(resolve.message));
        }
    },
    //退出登录
    async logOut({commit}){
        let resolve =  await reqLogOut()
        if(resolve.code == 200){
            commit('CLEARLOGOUT')
            localStorage.removeItem('token')
            return 'ok'
        }
        else{
            return Promise.reject(new Error(resolve.message))
        }
    }
}

const mutations={
    CREATECODE(state,code){
        state.code = code
    },
    GETUSERINFO(state,data){
        state.userinfo = data
    },
    USERTOKEN(state,data){
        state.token = data
    },
    CLEARLOGOUT(state){
        state.token = '',
        state.userinfo = {}
    }

}

const state={
    code:'',
    token:localStorage.getItem('token'),
    userinfo:{}
}

const getters={

}

export default {
    actions,
    mutations,
    state,
    getters,
}




 
