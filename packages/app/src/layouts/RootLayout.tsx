import "./RootLayout.css";

import { Link, Outlet } from "react-router-dom";
import type { RenderItemFunction, RenderSectionFunction } from "wmfnext-shell";
import { Suspense, useCallback, useState } from "react";
import { useEventBusListener, useNavigationItems, useRenderedNavigationItems, useSession } from "wmfnext-shell";

import type { AppSession } from "../session";
import { IncrementCountEvent } from "wmfnext-shared";
import { Loading } from "../components";

export function RootLayout() {
    const [count, setCount] = useState(0);

    const session = useSession() as AppSession;
    const navigationItems = useNavigationItems();

    useEventBusListener(IncrementCountEvent, () => {
        setCount(x => x + 1);
    });

    const renderItem: RenderItemFunction = useCallback(({ content, linkProps, additionalProps: { highlight, ...additionalProps } }, index, level) => {
        return (
            <li key={`${level}-${index}`} className={highlight && "highlight-item"}>
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
        <div className="wrapper">
            {session && (
                <div className="top-bar">
                    <div className="counter">
                        <span>Count: {count}</span>
                    </div>
                    <div>
                        <span>Current user: </span>{session.user.name}
                        <span className="separator">-</span>
                        <Link to="/logout">logout</Link>
                    </div>
                </div>
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
