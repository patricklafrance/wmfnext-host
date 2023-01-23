import HtmlWebpackPlugin from "html-webpack-plugin";
import { getFileDirectory } from "wmfnext-remote-loader/webpack.js";
import path from "path";

const __dirname = getFileDirectory(import.meta);

/** @type {import("webpack").Configuration} */
export default {
    mode: "development",
    target: "web",
    devtool: "inline-source-map",
    devServer: {
        port: 8082,
        historyApiFallback: true
    },
    entry: "./src/index.tsx",
    output: {
        // The trailing / is very important, otherwise paths will ne be resolved correctly.
        publicPath: "http://localhost:8082/"
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                        configFile: path.resolve(__dirname, "tsconfig.dev.json")
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
        alias: {
            // Without the aliases, at runtime an "Invalid hook call" is thrown, see https://stackoverflow.com/questions/64283813/invalid-hook-call-on-npm-link-library
            "react": path.resolve(__dirname, "../../node_modules/react"),
            "react-dom": path.resolve(__dirname, "../../node_modules/react-dom"),
            // Without the alias, at runtime the index route doesn't render and we are stuck with a blank page.
            "react-router-dom": path.resolve(__dirname, "../../node_modules/react-router-dom")
        },
        // Must add ".js" for files imported from node_modules.
        extensions: [".js", ".ts", ".tsx", ".css"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
};
