const env = process.env.NODE_ENV

export const getServerURI = () => {
    return env == "development" ? process.env.SERVER_HOST_LOCAL : process.env.SERVER_HOST_PROD
}