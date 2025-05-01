import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export function isUserLoggedIn(cookies: RequestCookies): boolean {
    const token = cookies.get('token')?.value;
    return Boolean(token);
}