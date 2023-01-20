import { ConsoleLogger, Runtime, RuntimeContext, registerStaticModules } from "wmfnext-shell";
import { Loading, TrackingService, TrackingServiceKey } from "wmfnext-shared";

import { App } from "./App";
import type { Session } from "wmfnext-shared";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { register } from "./register";

const runtime = new Runtime({
    loggers: [new ConsoleLogger()],
    services: {
        [TrackingServiceKey]: new TrackingService()
    },
    sessionAccessor: () => {
        return {
            user: {
                name: "temp"
            }
        } as Session;
    }
});

registerStaticModules([register], runtime);

const root = createRoot(document.getElementById("root"));

root.render(
    <RuntimeContext.Provider value={runtime}>
        <Suspense fallback={<Loading />}>
            <App />
        </Suspense>
    </RuntimeContext.Provider>
);
