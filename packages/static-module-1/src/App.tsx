import { Loading, useAppRouter } from "wmfnext-shared";

import { RouterProvider } from "react-router-dom";

export function App() {
    const router = useAppRouter();

    return (
        <RouterProvider
            router={router}
            fallbackElement={<Loading />}
        />
    );
}
