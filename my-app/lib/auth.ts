export function isUserLoggedIn(cookies: any): boolean {
    const token = cookies.get('token')?.value;
    return Boolean(token);
}