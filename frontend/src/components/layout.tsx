import { ReactNode } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
} from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import Header from "./Header";
import Main from "./Main";
import AuthProvider from "@/contexts/AuthContext";
import { errorLink } from "@/graphql/errors/error-link.gql";

const httpLink = createUploadLink({ uri: process.env.graphQlEndpoint });
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
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
