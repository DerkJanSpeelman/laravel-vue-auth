import axios from 'axios';
import { ref, Ref } from 'vue';

interface User {
    name: string,
    email: string,
}

class Auth {
    public token: Ref<string | null> = ref(null);
    public user: Ref<User | null>;

    constructor () {
        this.token.value = window.localStorage.getItem('token');

        let user = window.localStorage.getItem('user');

        this.user = ref(user ? JSON.parse(user) : null);

        if (this.token.value) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token.value}`;
        }
    }

    /**
     * Logs the user in, sets user info in the localStorage and sets the Bearer token
     *
     * @param  {string} token
     * @param  {User} user
     * @return {void}
     */
    public login(token: string, user: User) {
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('user', JSON.stringify(user));

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        this.token.value = token;
        this.user.value = user;
    }

    /**
     * Logs the user out and deletes user info and the (bearer) token
     *
     * @return {void}
     */
    public logout() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');

        if (axios.defaults.headers.common["Authorization"]) {
            delete axios.defaults.headers.common["Authorization"];
        }

        this.user.value = null;
    }

    /**
     * Checks whether the Authorization Bearer token is a valid token or not.
     *
     * @return {boolean}
     */
    public static async check() {
        const { data } = await axios.get('/api/check');

        return data;
    }
}

export default Auth;
