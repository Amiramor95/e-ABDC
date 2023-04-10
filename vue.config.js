const path = require('path');
const { EventEmitter } = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(15);
const StylelintPlugin = require('stylelint-webpack-plugin');

const lintOnSave = false;

module.exports = {
    lintOnSave: false,
    transpileDependencies: [
        'vuestic-ui',
        'epic-spinners',
    ],
    pages: {
        index: {
            // entry for the page
            entry: 'src/app/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'FiMM Admin',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                vue$: 'vue/dist/vue.esm.js',
                '@': path.resolve('src'),
            },
        },
        plugins: [
            ...(
                (!lintOnSave && process.env.NODE_ENV === 'development') ? [] : [new StylelintPlugin({
                    files: ['src/**/*.{vue,htm,html,css,sss,less,scss}'],
                })]
            ),
        ],

        devServer: {
            disableHostCheck: true,
            port: process.env.VUE_APP_PORT || 8080,
            proxy: {
                '^/api/module10': {
                    target: process.env.MODULE10_URL || 'http://0.0.0.0:7010',
                    ws: true,
                    changeOrigin: true,
                    secure: false,
                },
                // '^/api/koolreport': {
                //   target: 'http://localhost:7008',
                //   ws: true,
                //   changeOrigin: true,
                //   secure: false,
                // },
                // public: 'lfcs-stg.fimm.com.my',
                // disableHostCheck: true,
                '^/api/module0': {
                    target: process.env.MODULE0_URL || 'http://0.0.0.0:7000',
                    ws: true,
                    changeOrigin: true,
                    secure: false,
                },
                '^/api/module1': {
                    target: process.env.MODULE1_URL || 'http://0.0.0.0:7001',
                    ws: true,
                    changeOrigin: true,
                    secure: false,
                },
                '^/api/module2': {
                    target: process.env.MODULE2_URL || 'http://0.0.0.0:7002',
                    ws: true,
                    changeOrigin: true,
                    secure: false,
                },
                '^/api/module3': {
                    target: process.env.MODULE3_URL || 'http://0.0.0.0:7003',
                    ws: true,
                    changeOrigin: true,
                    secure: false,
                },
                '^/api/module4': {
                    target: process.env.MODULE4_URL || 'http://0.0.0.0:7004',
                    ws: true,
                    changeOrigin: true,
                    secure: false,
                },
                '^/api/module5': {
                    target: process.env.MODULE5_URL || 'http://0.0.0.0:7005',
                    ws: true,
                    changeOrigin: true,
                    secure: false,
                },
                '^/api/module6': {
                    target: process.env.MODULE6_URL || 'http://0.0.0.0:7006',
                    ws: true,
                    changeOrigin: true,
                    secure: false,
                },
                '^/api/module7': {
                    target: process.env.MODULE7_URL || 'http://0.0.0.0:7007',
                    ws: true,
                    changeOrigin: true,
                    secure: false,
                },
                'api/ems': {
                    target: process.env.EMS_URL || 'https://ems-stg.fimm.com.my/api',
                    ws: true,
                    changeOrigin: true,
                    secure: false,
                },
                '^/api/module9': {
                    target: process.env.MODULE9_URL || 'http://0.0.0.0:7009',
                    ws: true,
                    changeOrigin: true,
                    secure: false,
                },
                '^/api/module11': {
                    target: process.env.MODULE11 || 'http://0.0.0.0:7011',
                    ws: true,
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    },
    css: {
        loaderOptions: {
            sass: {
                // Preload vuestic-ui variables and mixins for every component
                data: '@import "~vuestic-ui/src/components/vuestic-sass/resources/resources.scss";',
            },
        },
    },
    pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: './src/service-worker.js',
            importWorkboxFrom: 'local',
        },
    },
};
