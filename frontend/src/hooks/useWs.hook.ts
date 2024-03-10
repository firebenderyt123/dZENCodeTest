import { useApolloClient } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { useEffect, useState } from "react";

export const useWs = () => {
  const [isConnected, setConnected] = useState<boolean>(false);
  const client = useApolloClient();
  const wsLink = client.link.right?.left as GraphQLWsLink;

  useEffect(() => {
    wsLink.client.on("connected", () => {
      setConnected(true);
    });

    wsLink.client.on("closed", () => {
      setConnected(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isConnected,
  };
};
