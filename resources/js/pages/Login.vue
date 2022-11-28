<template>
    <div>
        <h1>Login</h1>
        <form>
            <div>
                <label for="email">Email</label>
                <input type="email" autocomplete="username" v-model="user_data.email">
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" autocomplete="current-password" v-model="user_data.password">
            </div>
            <button @submit.prevent="login()" @click.prevent="login">Login</button>
        </form>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { getCurrentInstance, ref } from 'vue';
    import { useRouter } from 'vue-router'
    import type Auth from '../lib/Auth';

    const app = getCurrentInstance();
    const auth = <Auth | null>(app?.appContext.config.globalProperties.auth);
    const user_data = ref({
        email: '',
        password: '',
    });
    const router = useRouter();

    const login = () => {
        axios.post('/api/login', user_data.value)
        .then(({ data }) => {
            if (auth) {
                auth.login(data.access_token, data.user);
                router.push('/dashboard');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };
</script>