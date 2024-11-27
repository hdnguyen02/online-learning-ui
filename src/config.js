const config = {
    environment: import.meta.env.VITE_ENVIRONMENT,
    urlFrontend: import.meta.env.VITE_URL_FRONTEND,
    urlBackend: import.meta.env.VITE_URL_BACKEND,
    prefix: import.meta.env.VITE_PREFIX,
    unsplash_access_key: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
    unsplash_secret_key: import.meta.env.VITE_UNSPLASH_SECRET_KEY,
    voicerss_api_key: import.meta.env.VITE_VOICERSS_API_KEY,
    firebase: {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    },
};
config.baseUrl = config.urlBackend + '/' + config.prefix;

export default config;
