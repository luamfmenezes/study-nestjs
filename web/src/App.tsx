import {} from "apollo-boost";
import React from "react";
// import { ApolloProvider } from "@apollo/react-hooks";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

const link = createHttpLink({
  uri: "http://localhost:3333",
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Messages</h1>
      </div>
    </ApolloProvider>
  );
}

export default App;
