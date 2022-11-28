<template>
    <div>
        <h1>Dashboard</h1>
        Dashboard user: {{ user === null ? 'null' : user }}
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import axios from 'axios';

    const user = ref({});

    axios.get('/api/me')
    .then(({ data }) => {
        user.value = data.user;
    })
    .catch((error) => {
        console.log(error);
    });
</script>