import cookiesService from "@/services/cookies.service";

export const generateContext = (captcha?: string) => {
  const token = cookiesService.getToken();
  return {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
        "g-recaptcha": captcha,
      },
    },
  };
};
