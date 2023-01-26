import { Loading, useAppRouter } from "wmfnext-shared";

import { RouterProvider } from "react-router-dom";
import { lazy } from "react";
import { useAreRemotesReady } from "wmfnext-remote-loader";

const LoginPage = lazy(() => import("./pages/Login"));
const LogoutPage = lazy(() => import("./pages/Logout"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

export function App() {
    const isReady = useAreRemotesReady();

    console.log("isReady: ", isReady);

    const router = useAppRouter({
        rootRoutes: [
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
        ]
    });

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
