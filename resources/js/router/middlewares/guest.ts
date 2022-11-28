import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import type { Middleware } from './index';
import Auth from '../../lib/Auth';

/**
 * Guest middleware that simply checks the window.localStorage.getItem('token') and redirects to the home page if the user is logged in.
 *
 * @param  {RouteLocationNormalized} to
 * @param  {RouteLocationNormalized} from
 * @param  {NavigationGuardNext} next
 * @return {boolean} boolean
 */
const guest: Middleware = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): boolean => {
    if (window.localStorage.getItem('token')) {
        next({ name: 'home' });

        return false;
    }

    return true;
};

export default guest;