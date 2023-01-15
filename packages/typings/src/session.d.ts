import type { Session } from "wmfnext-shell";

export interface AppUser {
    readonly name;
}

export interface AppSession extends Session {
    readonly user: AppUser;
}
