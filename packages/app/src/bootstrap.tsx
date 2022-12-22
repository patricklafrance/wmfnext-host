import { ConsoleLogger, RuntimeContext, ShellRuntime } from "wmfnext-shell";
import type { RemoteDefinition, RemoteModuleRegistratorError } from "wmfnext-remote-loader";

import { App } from "./App";
import { Home } from "./pages";
import { RegistrationStatus } from "./registrationStatus";
import { createRoot } from "react-dom/client";
import { registerRemoteModules } from "wmfnext-remote-loader";

// TODO: move into a file.
declare global {
    interface Window {
        __registration_state__: RegistrationStatus;
    }
}

const Remotes: RemoteDefinition[] = [
    {
        url: "http://localhost:8081",
        name: "remote1"
    }
];

const runtime = new ShellRuntime({
    loggers: [new ConsoleLogger()]
});

// Register host application page routes.
runtime.registerRoutes([
    {
        index: true,
        element: <Home />
    }
]);

window.__registration_state__ = RegistrationStatus.inProgress;

registerRemoteModules(Remotes, runtime).then((errors: RemoteModuleRegistratorError[]) => {
    if (errors.length > 0) {
        runtime.logError("Errors occured during remotes registration: ", errors);
    }

    window.__registration_state__ = RegistrationStatus.completed;
});

const root = createRoot(document.getElementById("root"));

root.render(
    <RuntimeContext.Provider value={runtime}>
        <App />
    </RuntimeContext.Provider>
);
