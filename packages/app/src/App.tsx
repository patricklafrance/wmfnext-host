import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, useCallback, useMemo } from "react";
import { useHoistedRoutes, useIsAuthenticated, useRoutes } from "wmfnext-shell";

import { Loading } from "./components";
import { RootErrorBoundary } from "./RootErrorBoundary";
import { RootLayout } from "./layouts";
import { useIsReady } from "wmfnext-remote-loader";

const LoginPage = lazy(() => import("./pages/Login"));
const LogoutPage = lazy(() => import("./pages/Logout"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

function AuthenticatedRoutes() {
    return useIsAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}

export function App() {
    const registrationStatus = useIsReady();
    const routes = useRoutes();

    const hoistedRoutes = useHoistedRoutes(routes, {
        wrapNonHoistedRoutes: useCallback(x => {
            return {
                element: <AuthenticatedRoutes />,
                children: [
                    {
                        path: "/",
                        element: <RootLayout />,
                        children: [
                            {
                                // Pathless router to set an error boundary inside the layout instead of outside.
                                // It's quite useful to not lose the layout when an unmanaged error occurs.
                                errorElement: <RootErrorBoundary />,
                                children: [
                                    ...x
                                ]
                            }
                        ]
                    }
                ]
            };
        }, [])
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

    if (registrationStatus !== "ready") {
        return <Loading />;
    }

    return (
        <RouterProvider
            router={router}
            fallbackElement={<Loading />}
        />
    );
}
