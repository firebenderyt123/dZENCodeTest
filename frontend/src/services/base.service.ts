import { Error as MyError } from "@/interfaces/error.interface";

export default class BaseService {
  protected reportError(error: Error) {
    // need to add output to client about error
  }

  protected instanceOfError(data: any): data is MyError {
    return "message" in data && "statusCode" in data;
  }
}
