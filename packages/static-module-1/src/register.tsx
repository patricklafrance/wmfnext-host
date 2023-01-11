import type { ModuleRegisterFunction, Runtime } from "wmfnext-shell";
import { Page1, Page2, Page3, Page4, Page5, Page6 } from "./pages";

import { ArchiveIcon } from "./ArchiveIcon";

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
