import { ReactNode } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { createClient } from "graphql-ws";
import Header from "./Header";
import Main from "./Main";
import AuthProvider from "@/contexts/AuthContext";
import { errorLink } from "@/graphql/errors/error-link.gql";
import { getMainDefinition } from "@apollo/client/utilities";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:8000/api/v1/graphql",
    retryAttempts: 5,
    lazy: true,
  })
);
const httpLink = createUploadLink({ uri: process.env.graphQlEndpoint });
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, splitLink]),
});

if (process.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Header />
        <Main>{children}</Main>
      </AuthProvider>
    </ApolloProvider>
  );
}
