import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import Messages from "./components/Messages";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

// const httpLink = createHttpLink({
//   uri: "http://localhost:3333/graphql",
// });

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:3333/graphql`,
//   options: {
//     reconnect: true,
//   },
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

// const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache(),
// });

import client from "./services/api";
import Users from "./components/Users";

function App() {
  return (
    <ApolloProvider client={client}>
      <Messages />
      <Users />
    </ApolloProvider>
  );
}

export default App;
