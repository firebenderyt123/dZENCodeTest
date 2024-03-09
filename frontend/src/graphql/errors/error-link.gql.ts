import { errorNotify } from "@/utils/notifications.utils";
import { onError } from "@apollo/client/link/error";
import { SERVER_ERRORS } from "../enums/server-errors.enum";
import cookiesService from "@/services/cookies.service";

export const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.error(err);
        if (err.extensions) {
          if (err.extensions.statusCode === SERVER_ERRORS.UNAUTHENTICATED) {
            cookiesService.deleteToken();
          }
          errorNotify(err.message);
        } else if (err.message) {
          errorNotify(err.message);
        } else errorNotify("Unknown server error");
        return forward(operation);
      }
    }

    if (networkError) {
      errorNotify("Network error");
      console.error(`[Network error]: ${networkError}`);
    }
  }
);
