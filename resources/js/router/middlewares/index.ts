import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export type Middleware = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => boolean;

const runMiddlewares = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (!!to.meta.middlewares) {
        const middlewares: Middleware[] | [] = <Middleware[] | []>to.meta.middlewares;

        for (let middleware of middlewares) {
            let allowed = await middleware(to, from, next);

            if (allowed === false) {
                return;
            }
        }

        next();
    } else {
        next();
    }
};

export default runMiddlewares;