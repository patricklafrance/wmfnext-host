export interface AppUser {
    readonly name;
}

export interface AppSession {
    readonly user: AppUser;
}
