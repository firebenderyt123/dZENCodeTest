import cookiesService from "@/services/cookies.service";

export const generateContext = () => {
  const token = cookiesService.getToken();
  return {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    },
  };
};
