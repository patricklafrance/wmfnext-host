import { createHostPlugin as _createHostPlugin, createModulePlugin as _createModulePlugin } from "wmfnext-remote-loader/webpack.js";

import type { CreateConfigurationFunction } from "wmfnext-remote-loader/webpack";

export const ApplicationSharedDependencies = {
    "wmfnext-shell": {
        singleton: true,
        requiredVersion: "0.0.1"
    },
    "wmfnext-remote-loader": {
        singleton: true,
        requiredVersion: "0.0.1"
    },
    "wmfnext-shared": {
        singleton: true,
        requiredVersion: "0.0.1"
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
