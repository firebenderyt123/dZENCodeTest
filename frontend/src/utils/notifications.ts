import { toast } from "react-toastify";

export const successNotify = (message: string) => {
  toast.success(message, {
    position: "top-right",
    className: "notification",
  });
};

export const errorNotify = (message: string) => {
  toast.error(message, {
    position: "top-right",
    className: "notification",
  });
};
