import { createHostConfiguration as createBaseHostConfiguration, createModuleConfiguration as createBaseModuleConfiguration } from "wmfnext-remote-loader/createModuleFederationConfiguration.js";

import type { CreateConfigurationOptions } from "wmfnext-remote-loader/createModuleFederationConfiguration.js";
import type { PackageJson } from "type-fest";

export const AppSharedDependencies = {
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

export function createHostConfiguration(moduleName: string, packageJson: PackageJson, { sharedDependencies = {} }: CreateConfigurationOptions = {}) {
    return createBaseHostConfiguration(moduleName, packageJson, {
        sharedDependencies: {
            ...AppSharedDependencies,
            ...sharedDependencies
        }
    });
}

export function createModuleConfiguration(moduleName: string, packageJson: PackageJson, { sharedDependencies = {} }: CreateConfigurationOptions = {}) {
    return createBaseModuleConfiguration(moduleName, packageJson, {
        sharedDependencies: {
            ...AppSharedDependencies,
            ...sharedDependencies
        }
    });
}
