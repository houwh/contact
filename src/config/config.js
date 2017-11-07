import Env from './env';

const URI = 'http://dev.api.v2.wowoniu.com/manager' //线上

let config = {
    dev: {
        env: Env,
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                target:URI,
                changeOrigin: true,
                pathRewrite: {
                    '^/api':''
                }
            }
        },
    }
}
export default config;
