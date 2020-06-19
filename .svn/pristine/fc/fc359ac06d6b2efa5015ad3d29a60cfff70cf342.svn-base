import Vue from 'vue'
import Router from 'vue-router'
import routesList from './routesList'

Vue.use(Router);

const createRouter = () => new Router({
    scrollBehavior: () => ({y: 0}),
    routes: routesList
});
const router = createRouter();

//更新或重置router
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher // reset router
}

//路由拦截
router.beforeEach((to, from, next) => {
    if (to.path === "/") {
        // next("/IIAS/economic");
        next("/login");
    } else {
        next();
    }
});

export default router
