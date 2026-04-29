import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext..jsx";
import { client } from "./apollo/apolloClient.js";
import "./index.css";
import { ApolloProvider } from "@apollo/client/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);