import { ConsoleLogger, RuntimeContext, ShellRuntime, registerStaticModules } from "wmfnext-shell";
import type { RegistrationError, RemoteDefinition } from "wmfnext-remote-loader";

import { App } from "./App";
import { Home } from "./pages";
import { RegistrationStatus } from "./registrationStatus";
import { createRoot } from "react-dom/client";
import { registerRemoteModules } from "wmfnext-remote-loader";
import { register as registerStaticModule1 } from "wmfnext-static-module-1";

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

// Register host application navigation items.
runtime.registerNavigationItems([
    {
        to: "/",
        content: "Home"
    }
]);

window.__registration_state__ = RegistrationStatus.inProgress;

registerStaticModules([registerStaticModule1], runtime).then(() => {
    runtime.logger.debug("All static modules registered.");
});

registerRemoteModules(Remotes, runtime).then((errors: RegistrationError[]) => {
    if (errors.length > 0) {
        runtime.logger.error("Errors occured during remotes registration: ", errors);
    }

    window.__registration_state__ = RegistrationStatus.completed;

    runtime.logger.debug("All remote modules registered.");
});

const root = createRoot(document.getElementById("root"));

root.render(
    <RuntimeContext.Provider value={runtime}>
        <App />
    </RuntimeContext.Provider>
);
