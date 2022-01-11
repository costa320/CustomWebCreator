const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const packageJson = require("./package.json");
/* DOTENV */
const dotenv = require("dotenv").config({
  path: "./prod.env",
}).parsed;

// Enviroment variables
const envKeys = Object.keys(dotenv).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(dotenv[next]);
  return prev;
}, {});
envKeys[`process.env.REACT_APP_VERSION`] = JSON.stringify(packageJson.version);

/* plugins */
const plugins = [
  new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "index.html",
  }),
  new MiniCssExtractPlugin({
    filename: "css/[name].css",
    chunkFilename: "[id].css",
  }),
  new webpack.DefinePlugin(envKeys),
];

module.exports = (env) => {
  console.log(envKeys);
  return {
    entry: "./src/index.js",
    mode: "production",
    devtool: "source-map",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "js/main.js",
      publicPath: "/",
      clean: true,
      /* assetModuleFilename: "/static/[hash][ext][query]", */
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
        {
          test: /\.(js|jsx|ts)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: "[local]___[hash:base64:5]",
              },
            },
            {
              loader: "less-loader",
            },
          ],
        },
        {
          test: /\.(ttf|eot|woff2?)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 50000,
                name: "./fonts/[name].[ext]",
              },
            },
          ],
        },
        {
          /* Scripts/react-build/static/... => path need to be configurated as following to find image in .NET */
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "static/images/[hash][ext][query]",
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              //drop_console: true, // deletes all console.logs
              //drop_debugger: true,
              pure_funcs: ["console.log"], // deletes just calls to console.log function and not to console.info
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            type: "css/mini-extract",
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
    node: { fs: "empty", net: "empty", tls: "empty", dns: "empty" },
    devServer: {
      contentBase: path.join(__dirname, "public"),
      open: {
        app: ["chrome", "--incognito", "--other-flag"],
      },
      watchOptions: {
        poll: true,
      },
      watchContentBase: true,
      historyApiFallback: true,
      port: "3008",
      injectClient: false,
    },
    plugins: [...plugins],
  };
};
