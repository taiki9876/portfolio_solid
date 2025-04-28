/// <reference types="vitest" />
import { resolve } from 'node:path';
import * as fs from 'node:fs';
import { rm } from 'node:fs/promises';
import react from '@vitejs/plugin-react-swc';
import { ConfigEnv, defineConfig, loadEnv, LogLevel } from 'vite';

const APP_TARGET = (process.env.TARGET || 'admin') as keyof typeof configByTarget;

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig(({ mode }: ConfigEnv) => {
    const isDevelopment = mode === 'development';
    const envDir = loadAndInjectEnv(mode); //環境変数読み込み
    const { outDir, base, entryHtmlFile, watchTarget } = configByTarget[APP_TARGET]; //ターゲットごとの設定をまとめて管理

    return {
        test: {
            environment: 'jsdom',
            globals: true,
            setupFiles: ['./src/vitest.setup.ts'],
        },
        define: {
            APP_VERSION: JSON.stringify(process.env.npm_package_version),
        },
        plugins: [
            react(),
            {
                name: 'Cleaning assets folder',
                async buildStart() {
                    await rm(resolve(outDir, `assets`), {
                        recursive: true,
                        force: true,
                    });
                },
            },
        ],
        envDir: envDir,
        server: {
            host: process.env.VITE_LOCAL_REACT_HOST || '0.0.0.0',
            port: parseInt(process.env.VITE_LOCAL_REACT_PORT || '5173'),
        },
        resolve: {
            alias: {
                '@src': resolve(__dirname, 'src'),
                '@admin': resolve(__dirname, 'src/admin'),
                '@client': resolve(__dirname, 'src/client'),
            },
        },
        base: base,
        build: {
            sourcemap: isDevelopment,
            emptyOutDir: false,
            outDir: outDir,
            target: 'ESNext',
            chunkSizeWarningLimit: 1000,
            rollupOptions: {
                input: {
                    index: entryHtmlFile,
                },
                output: {
                    manualChunks(id) {
                        if (
                            id.includes('node_modules') &&
                            !id.includes('tabbable') &&
                            !id.includes('sentry')
                        ) {
                            if (id.includes('faker')) {
                                const arrfaker = id.toString().split('/');
                                return arrfaker[arrfaker.length - 1].toString();
                            } else {
                                return id
                                    .toString()
                                    .split('node_modules/')[1]
                                    .split('/')[0]
                                    .toString();
                            }
                        }
                    },
                    onLog(level: LogLevel, log: RollupLog, handler: LogOrStringHandler) {
                        // ignore due to unresolved issue in Vite5 ( See https://github.com/vitejs/vite/issues/15012 )
                        if (
                            log.cause &&
                            log.cause instanceof Error &&
                            log.cause.message === `Can't resolve original location of error.`
                        ) {
                            return;
                        }
                        handler(level, log);
                    },
                },
            },
            watch: {
                include: watchTarget,
            },
        },
        esbuild: {
            drop: isDevelopment ? [] : ['debugger', 'console'],
        },
    };
});

const bePath = '../backend/';
const entryHtmlDir = resolve(__dirname, 'html');

// ターゲットごとの設定をまとめて管理
const configByTarget = {
    admin: {
        entryHtmlFile: resolve(entryHtmlDir, 'admin.html'),
        outDir: resolve(__dirname, `${bePath}/public/admin-dist`),
        base: '/admin-dist/',
        watchTarget: ['src/admin/**', 'src/shared/**'],
    },
    client: {
        entryHtmlFile: resolve(entryHtmlDir, 'client.html'),
        outDir: resolve(__dirname, `${bePath}/public/client-dist`),
        base: '/client-dist/',
        watchTarget: ['src/client/**', 'src/shared/**'],
    },
};

// 環境変数読み込み + カスタム値追加
const loadAndInjectEnv = (mode: string) => {
    const envDir = resolve(__dirname, bePath);
    const env = loadEnv(mode, envDir);
    process.env = {
        ...process.env,
        ...env,
        NODE_ENV: mode,
        VITE_SHOP_VERSION: fs.readFileSync(resolve(envDir, 'VERSION'), 'utf-8').trim(),
        VITE_SHOP_REVISION: fs.readFileSync(resolve(envDir, 'REVISION'), 'utf-8').trim(),
    };
    return envDir;
};

// @see https://rollupjs.org/configuration-options/#onlog
type LogOrStringHandler = (level: LogLevel | 'error', log: string | RollupLog) => void;

interface RollupLog {
    binding?: string;
    cause?: Error;
    code?: string;
    exporter?: string;
    frame?: string; // always printed by the CLI
    hook?: string;
    id?: string; // always printed by the CLI
    ids?: string[];
    loc?: {
        column: number;
        file?: string;
        line: number;
    }; // always printed by the CLI if id is present
    message: string; // the actual message, always printed by the CLI
    names?: string[];
    plugin?: string; // added by Rollup for plugin logs, only printed for warnings
    pluginCode?: string; // added by Rollup for plugin logs that contain a code
    pos?: number;
    reexporter?: string;
    stack?: string; // url for additional information, always printed by the CLI
    url?: string;
}
