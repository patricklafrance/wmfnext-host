import { createHostPlugin as _createHostPlugin, createModulePlugin as _createModulePlugin } from "wmfnext-remote-loader/webpack.js";

import type { CreateConfigurationFunction } from "wmfnext-remote-loader/webpack";

export const ApplicationSharedDependencies = {
    "wmfnext-shared": {
        singleton: true,
        requiredVersion: "0.1.0"
    }
};

export const createHostPlugin: CreateConfigurationFunction = (moduleName, packageJson, { sharedDependencies = {} } = {}) => {
    return _createHostPlugin(moduleName, packageJson, {
        sharedDependencies: {
            ...ApplicationSharedDependencies,
            ...sharedDependencies
        }
    });
};


export const createModulePlugin: CreateConfigurationFunction = (moduleName, packageJson, { sharedDependencies = {} } = {}) => {
    return _createModulePlugin(moduleName, packageJson, {
        sharedDependencies: {
            ...ApplicationSharedDependencies,
            ...sharedDependencies
        }
    });
};
