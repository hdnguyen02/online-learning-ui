const config = {
    environment: import.meta.env.VITE_ENVIRONMENT,
    urlFrontend: import.meta.env.VITE_URL_FRONTEND,
    urlBackend: import.meta.env.VITE_URL_BACKEND,
    prefix: import.meta.env.VITE_PREFIX,
};
config.baseUrl = config.urlBackend + '/' + config.prefix;

export default config;
