import { Error as MyError } from "@/interfaces/error.interface";
import { errorNotify } from "@/utils/notifications";

export default class BaseService {
  protected reportError(error: Error) {
    errorNotify(error.message);
  }

  protected instanceOfError(data: any): data is MyError {
    return "message" in data && "statusCode" in data;
  }
}
