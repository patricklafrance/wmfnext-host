import { ConsoleLogger, LogLevel, ShellRuntime } from "wmfnext-shell";
import type { RemoteDefinition, RemoteModuleRegistratorError } from "wmfnext-remote-loader";

import { App } from "./App";
import { createRoot } from "react-dom/client";
import { registerRemoteModules } from "wmfnext-remote-loader";

const RemoteModulesRegistrationStatus = {
    inProgress: "in-progress",
    completed: "completed",
    failed: "failed"
};

const Remotes: RemoteDefinition[] = [
    {
        url: "http://localhost:8081",
        name: "remote1"
    }
];

const runtime = new ShellRuntime({
    loggers: [new ConsoleLogger()]
});

// @ts-ignore
window.__wmfnext_host_registrationState__ = RemoteModulesRegistrationStatus.inProgress;

registerRemoteModules(Remotes, runtime, { context: "foo" }).then((errors: RemoteModuleRegistratorError[]) => {
    if (errors.length > 0) {
        runtime.logError("Errors occured during remotes registration: ", errors);
    }

    // @ts-ignore
    window.__wmfnext_host_registrationState__ = RemoteModulesRegistrationStatus.completed;
});

const root = createRoot(document.getElementById("root"));

root.render(
    <App />
);
