import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GQL_ENDPOINT } from "../config";
import { getToken } from "../utils/auth.js";

const httpLink = createHttpLink({ uri: GQL_ENDPOINT });

const authLink = setContext((_, { headers }) => {
    const token = getToken();

    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});