import HtmlWebpackPlugin from "html-webpack-plugin";
import ModuleFederationPlugin from "webpack/lib/container/ModuleFederationPlugin.js";
import { createHostConfiguration } from "wmfnext-shared/createModuleFederationConfiguration.js";
import path from "path";
import url from "url";
import packageJson from "../../package.json" assert { type: "json" };

// "__dirname" is specific to CommonJS: https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/** @type {import("webpack").Configuration} */
export default {
    mode: "production",
    target: "web",
    cache: false,
    devtool: false,
    optimization: {
        minimize: true
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "http://localhost:8080/",
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
        new ModuleFederationPlugin(
            createHostConfiguration("host", packageJson)
        ),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
};
