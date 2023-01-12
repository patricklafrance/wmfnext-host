import type { ModuleRegisterFunction, Runtime } from "wmfnext-shell";

import { ArchiveIcon } from "./ArchiveIcon";
import { lazy } from "react";

const Page1 = lazy(() => import("./pages/Page1"));
const Page2 = lazy(() => import("./pages/Page2"));
const Page3 = lazy(() => import("./pages/Page3"));
const Page4 = lazy(() => import("./pages/Page4"));
const Page5 = lazy(() => import("./pages/Page5"));
const Page6 = lazy(() => import("./pages/Page6"));

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
        },
        {
            path: "static1/page-4",
            element: <Page4 />
        },
        {
            path: "static1/page-5",
            element: <Page5 />
        },
        {
            path: "static1/page-6",
            element: <Page6 />
        }
    ]);

    runtime.registerNavigationItems([
        {
            to: "static1/page-1",
            content: (
                <>
                    <ArchiveIcon />
                    <span>Static1/Page 1</span>
                </>
            ),
            style: {
                display: "flex",
                alignItems: "center"
            },
            target: "_blank"
        },
        {
            to: "static1/page-2",
            content: "Static1/Page 2",
            children: [
                {
                    to: "static1/page-4",
                    content: "Static1/Page 4"
                },
                {
                    to: "static1/page-5",
                    content: "Static1/Page 5"
                }
            ]
        },
        {
            to: "static1/page-3",
            content: "Static1/Page 3",
            priority: 99,
            additionalProps: {
                highlight: true
            }
        },
        {
            to: "static1/page-6",
            content: "Static1/Page 6"
        }
    ]);
};
