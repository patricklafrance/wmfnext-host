import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Loading } from "./components";
import { NotFound } from "./pages";
import { RegistrationStatus } from "./registrationStatus";
import { RootErrorBoundary } from "./RootErrorBoundary";
import { RootLayout } from "./layouts";
import { useMemo } from "react";
import { useRerenderOnceRemotesRegistrationCompleted } from "wmfnext-remote-loader";
import { useRoutes } from "wmfnext-shell";

// TODO: move into a file.
declare global {
    interface Window {
        __registration_state__: RegistrationStatus;
    }
}

export function App() {
    useRerenderOnceRemotesRegistrationCompleted(() => window.__registration_state__ === RegistrationStatus.completed);

    const federatedRoutes = useRoutes();

    const router = useMemo(() => {
        return createBrowserRouter([
            {
                path: "/",
                element: <RootLayout />,
                children: [
                    {
                        // Pathless router to set an error boundary inside the layout instead of outside.
                        // It's quite useful to not lose the layout when an unmanaged error occurs.
                        errorElement: <RootErrorBoundary />,
                        children: [
                            ...federatedRoutes,
                            {
                                path: "*",
                                element: <NotFound />
                            }
                        ]
                    }
                ]
            }
        ]);
    }, [federatedRoutes]);

    if (window.__registration_state__ === RegistrationStatus.inProgress) {
        return <Loading />;
    }

    return (
        <RouterProvider
            router={router}
            fallbackElement={<Loading />}
        />
    );
}
