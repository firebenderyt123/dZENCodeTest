import { ErrorResponse } from "@/interfaces/error-response.interface";
import { Error as MyError } from "@/interfaces/error.interface";
import { errorNotify } from "@/utils/notifications";

export default class BaseService {
  protected reportError(error: Error) {
    errorNotify(error.message);
  }

  protected errorHandler(error: unknown, callback: (data: MyError) => void) {
    if (this.instanceOfMyError(error)) {
      let newMessage = error.message;
      if (Array.isArray(error.message)) {
        newMessage = error.message.map((item) => item.message).join("\n");
      }
      callback({ ...error, message: newMessage });
    } else {
      this.reportError(error as Error);
      const newMyError: MyError = {
        error: "Server Error",
        message: (error as Error).message,
        statusCode: 500,
      };
      callback(newMyError);
    }
  }

  protected instanceOfMyError(error: any): error is MyError {
    return "message" in error && "statusCode" in error;
  }
}
