interface AuthSessionConfiguration {
    accessToken: string,
    idToken: string,
    expireAt: string,
    profile: string,
    scope: string,
    admin: string
}

export const SESSION_CONFIG: AuthSessionConfiguration = {
    accessToken: 'access_token',
    idToken: 'id_token',
    expireAt: 'expires_at',
    profile: 'profile',
    scope: 'scopes',
    admin: 'admin'
};