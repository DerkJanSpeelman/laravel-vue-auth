<template>
    <!-- <router-link :to="{ name: 'home' }">Home&nbsp;</router-link>
    <router-link v-if="!user" :to="{ name: 'login' }">Login&nbsp;</router-link>
    <router-link v-if="!user" :to="{ name: 'register' }">Register&nbsp;</router-link>
    <router-link v-if="user" :to="{ name: 'dashboard' }">Dashboard&nbsp;</router-link>
    <a v-if="!!user" href="javascript:void(0)" @click.prevent="logout">Logout</a> -->
    <router-view></router-view>

    <!-- <br/>
    Global app user: {{ user === null ? 'null' : user }} -->
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { getCurrentInstance } from 'vue';
    import type Auth from './lib/Auth';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const app = getCurrentInstance();
    const auth = <Auth | null>(app?.appContext.config.globalProperties.auth);

    const user = auth?.user;

    const logout = () => {
        axios.post('/api/logout')
        .then(({data}) => {
            if (auth) {
                auth.logout();
                router.push('/login');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };
</script>