import Home from '@/views/Home'
import Login from '@/views/Login'
import Search from '@/views/Search'
import Register from '@/views/Register'
import Detail from '@/views/Detail'
import ShopCart from '@/views/ShopCart'
import AddCartSuccess from '@/views/AddCartSuccess'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'


export default [
    {
        path: '/center',
        name: 'center',
        component: Center
    },
    {
        path: '/paysuccess',
        name: 'paysuccess', 
        //component: import('@/views/Paysuccess'),  懒加载
        component: PaySuccess,
        beforeEnter: (to, from, next) => {
            // ...
            if (from.path == '/pay') {
                next();
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: Pay,
        beforeEnter: (to, from, next) => {
            // ...
            if (from.path == '/trade') {
                next();
            } else {
                next(false)
            }
        }
    },
    {
        path: '/trade',
        name: 'trade',
        component: Trade,
        beforeEnter: (to, from, next) => {
            // ...
            if (from.path == '/shopcart') {
                next();
            } else {
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        name: 'ShopCart',
        component: ShopCart,

    },
    {
        path: '/addcartsuccess',
        name: 'AddCartSuccess',
        component: AddCartSuccess,
    },
    {
        path: '/home',
        name: 'home',
        component: Home,

    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        /*  meta:{isShow:false} */
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { isShow: true }
    },
    {
        path: '/search',
        name: 'search',
        component: Search,

        /*  props:true,
         props:{a:1,b2},
         props:(route)=>{
             return{keyWord:route.params.keyWord, k:route.query.keyWord}  //用户的最多的，但是也很少使用props传参
         } */
    },
    //重定向
    {
        path: "/",
        component: Home,

    },
    {
        path: '/detail/:skuid',
        component: Detail,
    }
]