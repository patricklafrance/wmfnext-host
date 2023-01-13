import { Session, deepFreeze, isNil, isNilOrEmpty } from "wmfnext-shell";

import type { SessionAccessorFunction } from "wmfnext-shell";

export class AppUser {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    serialize() {
        return {
            name: this._name
        };
    }

    static parse(obj: Record<string, unknown>) {
        return new AppUser(obj["name"] as string);
    }
}

export class AppSession implements Session {
    private _user: AppUser;

    constructor(user: AppUser) {
        this._user = user;
    }

    get user() {
        return this._user;
    }

    serialize() {
        return {
            user: this._user.serialize()
        };
    }

    static parse(obj: Record<string, unknown>) {
        const user = AppUser.parse(obj["user"] as Record<string, unknown>);

        return new AppSession(user);
    }
}

const SessionKey = "app-session";

class LocalStorageSessionManager {
    private _cache: Readonly<AppSession> = undefined;

    setSession(session: AppSession) {
        if (isNil(session)) {
            window.sessionStorage.removeItem(SessionKey);
        } else {
            const serializedSession = session.serialize();

            window.sessionStorage.setItem(SessionKey, JSON.stringify(serializedSession));
        }

        this._cache = undefined;
    }

    getSession() {
        if (this._cache) {
            return this._cache;
        }

        const rawSession = window.sessionStorage.getItem(SessionKey);

        if (!isNilOrEmpty(rawSession)) {
            const parsedSession = JSON.parse(rawSession);

            if (parsedSession) {
                const session = AppSession.parse(parsedSession);

                this._cache = deepFreeze(session);

                return this._cache;
            }
        }

        return undefined;
    }

    clearSession() {
        this._cache = undefined;

        window.sessionStorage.removeItem(SessionKey);
    }
}

export const sessionManager = new LocalStorageSessionManager();

export const sessionAccessor: SessionAccessorFunction = () => {
    return sessionManager.getSession();
};
