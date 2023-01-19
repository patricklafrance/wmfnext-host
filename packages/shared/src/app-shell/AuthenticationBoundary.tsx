import { Navigate, Outlet } from "react-router-dom";

import { useIsAuthenticated } from "wmfnext-shell";

export function AuthenticationBoundary() {
    return useIsAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}
