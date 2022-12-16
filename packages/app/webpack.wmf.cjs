const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = function(packageDependencies) {
    return new ModuleFederationPlugin({
        name: "host",
        shared: {
            "react": {
                singleton: true,
                requiredVersion: packageDependencies["react"]
            },
            "react-dom": {
                singleton: true,
                requiredVersion: packageDependencies["react-dom"]
            },
            "react-router-dom": {
                singleton: true,
                requiredVersion: packageDependencies["react-router-dom"]
            }
        }
    });
};
