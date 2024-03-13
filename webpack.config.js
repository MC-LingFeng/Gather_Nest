/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const dotEnv = require('dotenv');
// fork-ts-checker-webpack-plugin需要单独安装
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// 先构造出.env*文件的绝对路径
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const pathsDotenv = resolveApp('env');
// // 按优先级由高到低的顺序加载.env文件
dotEnv.config({ path: `${pathsDotenv}/.env` }); // 加载.env
dotEnv.config({ path: `${pathsDotenv}/.env.${process.env.NODE_ENV}` }); // 加载.env.local
// dotEnv.config({ path: `${pathsDotenv}/.env.development` }); // 加载.env.development
const envConfig1 = dotEnv.parse(fs.readFileSync(`${pathsDotenv}/.env`));
const envConfig2 = dotEnv.parse(
  fs.readFileSync(`${pathsDotenv}/.env.${process.env.NODE_ENV}`),
);
const value = {};
const envConfig = { ...envConfig1, ...envConfig2 };
for (const k in envConfig) {
  // 强制修改process.env下所有envConfig中存在的属性
  value[`process.env.${k}`] = JSON.stringify(envConfig[k]);
}

module.exports = {
  entry: './src/main',
  target: 'node',

  // 置为空即可忽略webpack-node-externals插件
  externals: {},
  // ts文件的处理
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'ts-loader',
          options: { transpileOnly: true },
        },
        exclude: /node_modules/,
      },
    ],
  },
  // 打包后的文件名称以及位置
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  plugins: [
    // 需要进行忽略的插件
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          '@nestjs/microservices',
          '@nestjs/microservices/microservices-module',
          '@nestjs/websockets/socket-module',
          'cache-manager',
          'class-validator',
          'class-transformer',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource, {
            paths: [process.cwd()],
          });
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.BUILD_ENV': `${process.env.NODE_ENV}`,
      'process.env.NODE_ENV': `${process.env.NODE_ENV}`,
      ...value,
    }),
  ],
};
