import { ReactNode } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Header from "./Header";
import Main from "./Main";
import AuthProvider from "@/contexts/AuthContext";

const client = new ApolloClient({
  uri: process.env.graphQlEndpoint,
  cache: new InMemoryCache(),
});

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
