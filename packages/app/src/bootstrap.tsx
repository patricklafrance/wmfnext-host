import { ConsoleLogger, Runtime, RuntimeContext, registerStaticModules } from "wmfnext-shell";
import { Loading, TrackingService, TrackingServiceKey } from "wmfnext-shared";
import { StrictMode, Suspense } from "react";

import { App } from "./App";
import { CustomLogger } from "./customLogger";
import type { RemoteDefinition } from "wmfnext-remote-loader";
import { createRoot } from "react-dom/client";
import { registerRemoteModules } from "wmfnext-remote-loader";
import { register as registerStaticModule1 } from "wmfnext-static-module-1";
import { sessionAccessor } from "./session";

const isNetlify = process.env.NETLIFY === "true";

const StaticModules = [
    registerStaticModule1
];

const Remotes: RemoteDefinition[] = [
    {
        url: isNetlify ? "https://wmfnext-remote-1.netlify.app" : "http://localhost:8081",
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
    <StrictMode>
        <RuntimeContext.Provider value={runtime}>
            <Suspense fallback={<Loading />}>
                <App />
            </Suspense>
        </RuntimeContext.Provider>
    </StrictMode>
);
