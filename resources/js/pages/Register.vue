<template>
    <div>
        <h1>Register</h1>
        <form>
            <div>
                <label for="name">Name</label>
                <input type="text" autocomplete="name" v-model="user_data.name">
            </div>
            <div>
                <label for="email">Email</label>
                <input type="text" autocomplete="username" v-model="user_data.email">
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" autocomplete="new-password" v-model="user_data.password">
            </div>
            <div>
                <label for="password_confirmation">Confirm Password</label>
                <input type="password" autocomplete="new-password" v-model="user_data.password_confirmation">
            </div>
            <button @submit.prevent="register()" @click.prevent="register()">Register</button>
        </form>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const user_data = ref({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const router = useRouter();

    const register = () => {
        axios.post('/api/register', user_data.value)
        .then(() => {
            router.push('/login');
        })
        .catch((error) => {
            console.log(error);
        });
    };
</script>