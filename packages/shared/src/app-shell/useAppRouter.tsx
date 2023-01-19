import { Route, useHoistedRoutes, useRoutes } from "wmfnext-shell";
import { useCallback, useMemo, useState } from "react";

import { AuthenticationBoundary } from "./AuthenticationBoundary";
import { RootErrorBoundary } from "./RootErrorBoundary";
import { RootLayout } from "./RootLayout";
// Importing the Router type to prevent: error TS2742: The inferred type of 'useAppRouter' cannot be named without a reference
import type { Router } from "@remix-run/router";
import { createBrowserRouter } from "react-router-dom";

export interface UseAppRouterOptions {
    rootRoutes?: Route[];
}

export function useAppRouter({ rootRoutes = [] }: UseAppRouterOptions = {}): Router {
    // Hack to reuse the same array reference through re-renders.
    const [memoizedRootRoutes] = useState(rootRoutes);

    const routes = useRoutes();

    const wrapManagedRoutes = useCallback((managedRoutes: Readonly<Route[]>) => {
        return {
            element: <AuthenticationBoundary />,
            children: [
                {
                    path: "/",
                    element: <RootLayout />,
                    children: [
                        {
                            // Pathless route to set an error boundary inside the layout instead of outside.
                            // It's quite useful to prevent losing the layout when an unmanaged error occurs.
                            errorElement: <RootErrorBoundary />,
                            children: [
                                ...managedRoutes
                            ]
                        }
                    ]
                }
            ]
        };
    }, []);

    // Using the useHoistedRoutes hook allow routes hoisted by modules to be rendered at the root of the router instead of under the root layout.
    // To disallow the hoisting functionality, do not use this hook.
    const hoistedRoutes = useHoistedRoutes(routes, {
        wrapManagedRoutes,
        // Only the following routes can be hoisted by modules.
        allowedPaths: [
            "remote1/page-2",
            "remote1/page-4"
        ]
    });

    const router = useMemo(() => {
        return createBrowserRouter([...hoistedRoutes, ...memoizedRootRoutes]);
    }, [hoistedRoutes, memoizedRootRoutes]);

    return router;
}
