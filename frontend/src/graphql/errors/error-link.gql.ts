import { errorNotify } from "@/utils/notifications.utils";
import { onError } from "@apollo/client/link/error";
import { SERVER_ERRORS } from "../enums/server-errors.enum";
import cookiesService from "@/services/cookies.service";

export const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.statusCode) {
          case SERVER_ERRORS.UNAUTHENTICATED:
            cookiesService.deleteToken();
            break;
          default:
            break;
        }
        errorNotify(err.message);
        return forward(operation);
      }
    }

    if (networkError) {
      errorNotify("Network error");
      console.log(`[Network error]: ${networkError}`);
    }
  }
);
