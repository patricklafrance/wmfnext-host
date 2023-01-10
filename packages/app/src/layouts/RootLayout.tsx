import { Link, Outlet } from "react-router-dom";
import { Suspense, useCallback } from "react";
import { useNavigationItems, useRenderNavigationItems } from "wmfnext-shell";

import { Loading } from "../components";
import type { ReactNode } from "react";
import type { RenderNavigationItem } from "wmfnext-shell";

export function RootLayout() {
    const navigationItems = useNavigationItems();

    const renderItem = useCallback(({ content, linkProps, additionalProps }: RenderNavigationItem, index: number, level: number) => {
        return (
            <li key={`${level}-${index}`}>
                <Link {...linkProps} {...additionalProps}>{content}</Link>
            </li>
        );
    }, []);

    const renderSection = useCallback((itemElements: ReactNode[], index: number, level: number) => {
        return (
            <ul key={`${level}-${index}`}>
                {itemElements}
            </ul>
        );
    }, []);

    const renderedNavigationItems = useRenderNavigationItems(navigationItems, renderItem, {
        renderSection
    });

    return (
        <div>
            <nav>{renderedNavigationItems}</nav>
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
        </div>
    );
}
