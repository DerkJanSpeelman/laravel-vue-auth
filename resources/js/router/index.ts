import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import runMiddlewares from './middlewares';

// Create the router
const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Add the middlewares
router.beforeEach(runMiddlewares);

export default router;
