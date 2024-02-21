import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/", sameSite: "strict" });

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const setCookie = (name: string, data: string) => {
  cookies.set(name, data);
};

export const deleteCookie = (name: string) => {
  cookies.remove(name);
};
