import Cookies, { CookieSetOptions } from "universal-cookie";
const cookies = new Cookies();
export function setTokenCoookie(token: string) {
  cookies.set("token", token, {
    path: "/",
    expires: new Date(Date.now() + 0.5 * 60 * 60 * 1000),
  });
}

export function getCookie(key: string) {
  return cookies.get(key);
}

export function removeCookie(key: string) {
  return cookies.remove(key);
}
