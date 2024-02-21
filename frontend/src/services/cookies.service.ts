import Cookies, { CookieSetOptions } from "universal-cookie";

class CookiesService {
  private readonly cookieTokenName = "accessToken";
  private cookies: Cookies;

  constructor(defaultSetOptions: CookieSetOptions) {
    this.cookies = new Cookies(null, defaultSetOptions);
  }

  getToken(): string {
    return this.getCookie(this.cookieTokenName);
  }

  setToken(value: string): void {
    this.setCookie(this.cookieTokenName, value);
  }

  deleteToken(): void {
    return this.deleteCookie(this.cookieTokenName);
  }

  private getCookie(name: string) {
    return this.cookies.get(name);
  }

  private setCookie(name: string, data: string) {
    this.cookies.set(name, data);
  }

  private deleteCookie(name: string) {
    this.cookies.remove(name);
  }
}
const cookiesService = new CookiesService({ path: "/", sameSite: "strict" });
export default cookiesService;
