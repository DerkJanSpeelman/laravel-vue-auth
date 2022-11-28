import type { RouteRecordRaw } from 'vue-router';
import auth from './middlewares/auth';
import guest from './middlewares/guest';

// Dynamically load in the pages
function page (path: string): () => Promise<any> {
    return () => import(`../pages/${path}.vue`).then(m => m.default || m);
}

// TODO: remove example
const Home = { template: '<div><h1>Home</h1></div>' };

let routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/game',
        name: 'game',
        component: page('Game'),
    },
    {
        path: '/login',
        name: 'login',
        component: page('Login'),
        meta: {
            middlewares: [ guest ]
        }
    },
    {
        path: '/register',
        name: 'register',
        component: page('Register'),
        meta: {
            middlewares: [ guest ]
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: page('Dashboard'),
        meta: {
            middlewares: [ auth ]
        }
    },
];

export default routes;
