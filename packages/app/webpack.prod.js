import HtmlWebpackPlugin from "html-webpack-plugin";
import { createHostPlugin } from "wmfnext-shared/webpack.js";
import { getFileDirectory } from "wmfnext-remote-loader/webpack.js";
import path from "path";

import packageJson from "../../package.json" assert { type: "json" };

const __dirname = getFileDirectory(import.meta);

/** @type {import("webpack").Configuration} */
export default {
    mode: "production",
    target: "web",
    cache: false,
    devtool: false,
    optimization: {
        minimize: true
    },
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        // The trailing / is very important, otherwise paths will ne be resolved correctly.
        publicPath: "https://wmfnext-host.netlify.app/",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: path.resolve(__dirname, "tsconfig.build.json")
                    }
                }
            },
            {
                // https://stackoverflow.com/questions/69427025/programmatic-webpack-jest-esm-cant-resolve-module-without-js-file-exten
                test: /\.js/,
                resolve: {
                    fullySpecified: false
                }
            },
            {
                test: /\.(css)$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: "asset/resource"
            }
        ]
    },
    resolve: {
        // Must add ".js" for files imported from node_modules.
        extensions: [".js", ".ts", ".tsx", ".css"]
    },
    plugins: [
        createHostPlugin("host", packageJson),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
};
