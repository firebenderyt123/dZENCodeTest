import { ErrorResponse } from "@/interfaces/error-response.interface";
import { ErrorData } from "@/interfaces/error.interface";
import { errorNotify } from "@/utils/notifications.utils";

export default abstract class BaseService {
  protected errorHandler(
    error: unknown,
    callback: (errorMessage: ErrorData) => void
  ) {
    if (this.instanceOfErrorResponse(error)) {
      let newMessage: string;
      if (Array.isArray(error.message)) {
        newMessage = error.message.map((item) => item.message).join("\n");
      } else newMessage = error.message;
      callback({ message: newMessage, statusCode: error.statusCode });
    } else {
      const errorMessage = "Oops.. Server error :(";
      this.showError(errorMessage);
      callback({ message: errorMessage, statusCode: 500 });
    }
  }
  protected showError(errorMessage: string) {
    errorNotify(errorMessage);
  }

  private instanceOfErrorResponse(error: any): error is ErrorResponse {
    return "message" in error && "statusCode" in error;
  }
}
