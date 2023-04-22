//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routers'
import store from '@/store'
//使用路由


Vue.use(VueRouter)

//重写vueRouter.push与repalce方法

let originvueRouterPush = VueRouter.prototype.push

let originvueRouterRepalce = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
    if (reject && resolve) {
        originvueRouterPush.call(this, location, resolve, reject)
    } else {
        originvueRouterPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (reject && resolve) {
        originvueRouterRepalce.call(this, location, resolve, reject)
    } else {
        originvueRouterRepalce.call(this, location, () => { }, () => { })
    }
}

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

router.beforeEach((to, from, next) => {
    let token = store.state.user.token

    if (token) {
        let name = store.state.user.userinfo.name
        if (name) {
            if (to.path == '/login' || to.path == '/register') {
                next('/home')
            } else {
                next()
            }

        } else {
            try {
                store.dispatch('getUserInfo')

                next()
            } catch (error) {
                next('/login')
            }
        }

    } else {

        if (to.path == '/shopcart' || to.path == '/paysuccess' || to.path == '/pay' || to.path == '/trade' || to.path == '/addcartsuccess' || to.path == '/center') {
            alert('Please login')
            next('/login?reduce=' + to.path)
        } else {
            next()
        }
    }

})

export default router