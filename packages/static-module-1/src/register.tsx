import type { ModuleRegisterFunction, Runtime } from "wmfnext-shell";
import { Page1, Page2, Page3 } from "./pages";

export const register: ModuleRegisterFunction = (runtime: Runtime) => {
    runtime.registerRoutes([
        {
            path: "static1/page-1",
            element: <Page1 />
        },
        {
            path: "static1/page-2",
            element: <Page2 />
        },
        {
            path: "static1/page-3",
            element: <Page3 />
        }
    ]);

    runtime.registerNavigationItems([
        {
            to: "static1/page-1",
            content: "Static1/Page 1"
        },
        {
            to: "static1/page-2",
            content: "Static1/Page 2"
        },
        {
            to: "static1/page-3",
            content: "Static1/Page 3"
        }
    ]);
};
