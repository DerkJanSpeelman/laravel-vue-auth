import { createApp, defineAsyncComponent } from 'vue';
import Auth from './lib/Auth';
import router from './router';

// Define the main component
const asyncComp = defineAsyncComponent(async () =>
    import('./App.vue'),
);

// Create the app
const app = createApp(asyncComp);

// Configure
app.config.globalProperties.auth = new Auth();

// Install plugins
app.use(router);

// Mount the app
app.mount('#app');
