import { Error as MyError } from "@/interfaces/error.interface";
import { errorNotify } from "@/utils/notifications";

export default class BaseService {
  protected reportError(error: Error) {
    errorNotify(error.message);
  }

  protected errorHandler(error: unknown, callback: (data: MyError) => void) {
    if (this.instanceOfMyError(error)) {
      callback(error);
    } else {
      this.reportError(error as Error);
    }
  }

  protected instanceOfMyError(error: any): error is MyError {
    return "message" in error && "statusCode" in error;
  }
}
