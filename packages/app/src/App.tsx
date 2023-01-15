import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, useCallback, useMemo } from "react";
import { useHoistedRoutes, useIsAuthenticated, useRoutes } from "wmfnext-shell";

import { Loading } from "./components";
import { RootErrorBoundary } from "./RootErrorBoundary";
import { RootLayout } from "./layouts";
import { useAreRemotesReady } from "wmfnext-remote-loader";

const LoginPage = lazy(() => import("./pages/Login"));
const LogoutPage = lazy(() => import("./pages/Logout"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

function AuthenticatedRoutes() {
    return useIsAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}

export function App() {
    const isReady = useAreRemotesReady();
    const routes = useRoutes();

    const wrapManagedRoutes = useCallback(managedRoutes => {
        return {
            element: <AuthenticatedRoutes />,
            children: [
                {
                    path: "/",
                    element: <RootLayout />,
                    children: [
                        {
                            // Pathless route to set an error boundary inside the layout instead of outside.
                            // It's quite useful to not lose the layout when an unmanaged error occurs.
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

    // Using the useHoistedRoutes hook allow routes hoisted by modules to be rendered at the root of the router.
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
        return createBrowserRouter([
            ...hoistedRoutes,
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "logout",
                element: <LogoutPage />
            },
            {
                path: "*",
                element: <NotFoundPage />
            }
        ]);
    }, [hoistedRoutes]);

    if (!isReady) {
        return <Loading />;
    }

    return (
        <RouterProvider
            router={router}
            fallbackElement={<Loading />}
        />
    );
}
