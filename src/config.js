const config = {
    environment: import.meta.env.VITE_ENVIRONMENT,
    urlFrontend: import.meta.env.VITE_URL_FRONTEND,
    urlBackend: import.meta.env.VITE_URL_BACKEND,
    prefix: import.meta.env.VITE_PREFIX,
    unsplash_access_key: import.meta.env.VITE_UNSPLASH_ACCESS_KEY, 
    unsplash_secret_key: import.meta.env.VITE_UNSPLASH_SECRET_KEY, 
    voicerss_api_key: import.meta.env.VITE_VOICERSS_API_KEY
};
config.baseUrl = config.urlBackend + '/' + config.prefix;

export default config;
