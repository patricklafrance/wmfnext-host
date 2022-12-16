function loadRemoteScript(url) {
    return new Promise((resolve, reject) => {
        const element = document.createElement("script");

        element.src = url;
        element.type = "text/javascript";
        element.async = true;

        let timeoutId;
        let hasCanceled = false;

        function cancel(error) {
            hasCanceled = true;

            element.parentElement.removeChild(element);
            reject(error);
        }

        element.onload = () => {
            if (!hasCanceled) {
                clearTimeout(timeoutId);

                element.parentElement.removeChild(element);
                resolve();
            }
        };

        element.onerror = error => {
            clearTimeout(timeoutId);
            cancel(error);
        };

        document.head.appendChild(element);

        // TODO: I don't know if it's a good idea, if a user experience latency we might cancel the loading of the remote even if the server is up.
        // Eagerly reject the loading of a script, it's too long when a remote is unavailable.
        timeoutId = setTimeout(() => {
            cancel(new Error("Remote script timeout."));
        }, 2000);
    });
}

// Implementation of https://webpack.js.org/concepts/module-federation/#dynamic-remote-containers.
async function loadDynamicRemote(url, containerName, moduleName) {
    console.log("url: ", url);
    console.log("containerName: ", containerName);
    console.log("moduleName: ", moduleName);

    await loadRemoteScript(url);

    // Initializes the share scope. It fills the scope with known provided modules from this build and all remotes.
    // eslint-disable-next-line no-undef
    await __webpack_init_sharing__("default");

    // Retrieve the module federation container.
    const container = window[containerName];

    console.log("container: ", container);

    // Initialize the container, it may provide shared modules.
    // eslint-disable-next-line no-undef
    await container.init(__webpack_share_scopes__.default);

    // Retrieve the module.
    const factory = await container.get(moduleName);

    if (!factory) {
        throw new Error(`Module ${moduleName} is not available.`);
    }

    return factory();
}

function registerModule(moduleInstance, moduleName) {
    if (!moduleInstance.register) {
        throw new Error(`Cannot find a "register" function for remote module ${moduleName}`);
    }

    moduleInstance.register();
}

export async function registerDynamicRemotes(remotes) {
    const errors = [];

    await Promise.allSettled(remotes.map(async x => {
        try {
            const module = await loadDynamicRemote(`${x.url}/remoteEntry.js`, x.name, "./register");

            registerModule(module, `${x.name}/.register`);
        } catch (error) {
            errors.push({
                ...x,
                error
            });
        }
    }));

    return errors;
}
