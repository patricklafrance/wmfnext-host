import "./RootLayout.css";

import { Link, Outlet } from "react-router-dom";
import type { RenderItemFunction, RenderSectionFunction } from "wmfnext-shell";
import { Suspense, useCallback } from "react";
import { useNavigationItems, useRenderedNavigationItems, useSession } from "wmfnext-shell";

import type { AppSession } from "../session";
import { Loading } from "../components";

export function RootLayout() {
    const session = useSession<AppSession>();
    const navigationItems = useNavigationItems();

    const renderItem: RenderItemFunction = useCallback(({ content, linkProps, additionalProps: { highlight, ...additionalProps } }, index, level) => {
        return (
            <li key={`${level}-${index}`} className={highlight && "highlight"}>
                <Link {...linkProps} {...additionalProps}>
                    {content}
                </Link>
            </li>
        );
    }, []);

    const renderSection: RenderSectionFunction = useCallback((itemElements, index, level) => {
        return (
            <ul key={`${level}-${index}`}>
                {itemElements}
            </ul>
        );
    }, []);

    const renderedNavigationItems = useRenderedNavigationItems(navigationItems, renderItem, renderSection);

    return (
        <div>
            {session && (
                <>
                    <div>
                        <span>Current user: </span>{session.user.name}
                    </div>
                    <div>
                        <Link to="/logout">logout</Link>
                    </div>
                </>
            )}
            <nav className="nav">
                {renderedNavigationItems}
            </nav>
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
        </div>
    );
}
