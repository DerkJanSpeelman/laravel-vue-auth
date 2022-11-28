import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import type { Middleware } from './index';
import Auth from '../../lib/Auth';

/**
 * Authentication middleware that checks if the user is authenticated or not.
 *
 * @param  {RouteLocationNormalized} to
 * @param  {RouteLocationNormalized} from
 * @param  {NavigationGuardNext} next
 * @return {boolean} boolean
 */
const auth = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): Promise<boolean> => {
    if (!(await Auth.check())) {
        next({ name: 'login' });

        return false;
    }

    return true;
};

export default auth;