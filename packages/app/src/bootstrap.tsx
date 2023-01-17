import { ConsoleLogger, Runtime, RuntimeContext, registerStaticModules } from "wmfnext-shell";

import { App } from "./App";
import { CustomLogger } from "./customLogger";
import { Loading } from "./components";
import type { RemoteDefinition } from "wmfnext-remote-loader";
import { Suspense } from "react";
import { TrackingService } from "./trackingService";
import { TrackingServiceKey } from "wmfnext-shared";
import { createRoot } from "react-dom/client";
import { registerRemoteModules } from "wmfnext-remote-loader";
import { register as registerStaticModule1 } from "wmfnext-static-module-1";
import { sessionAccessor } from "./session";

const StaticModules = [
    registerStaticModule1
];

const Remotes: RemoteDefinition[] = [
    {
        url: "http://localhost:8081",
        name: "remote1"
    }
];

const runtime = new Runtime({
    loggers: [new ConsoleLogger(), new CustomLogger()],
    services: {
        [TrackingServiceKey]: new TrackingService()
    },
    sessionAccessor
});

registerStaticModules(StaticModules, runtime);

registerRemoteModules(Remotes, runtime);

const root = createRoot(document.getElementById("root"));

root.render(
    <RuntimeContext.Provider value={runtime}>
        <Suspense fallback={<Loading />}>
            <App />
        </Suspense>
    </RuntimeContext.Provider>
);
