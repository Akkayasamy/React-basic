import axios from "axios";
import { toast } from "react-toastify";

const GRAPHQL_URL = "http://localhost:4000/graphql";

export const authService = {
  login: async (email, password) => {
    const query = `
      mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
          status
          errorMessage
          token
          id
          first_name
          last_name
          email
        }
      }
    `;

    const response = await axios.post(GRAPHQL_URL, {
      query,
      variables: { email, password },
    });

    const data = response.data?.data?.loginUser;

    if (data?.status !== 200) {
      toast.error(data?.errorMessage || "Login failed");
      return {
        status: 400
      };
    }
    return data;

  },

  register: async (firstName, lastName, email, password) => {
    const query = `
      mutation registerUser(
        $firstName: String!,
        $lastName: String!,
        $email: String!,
        $password: String!
      ) {
        registerUser(
          first_name: $firstName,
          last_name: $lastName,
          email: $email,
          password: $password
        ) {
          status
          errorMessage
          token
        }
      }
    `;

    try {
      const response = await axios.post(GRAPHQL_URL, {
        query,
        variables: {
          firstName,
          lastName,
          email,
          password,
        },
      });

      const data = response.data?.data?.registerUser;

      if (data?.status !== 200) {
        toast.error(data?.errorMessage || "Register failed");
        return {
          status: 400
        };
      }
      return data;

    } catch (error) {
      throw new Error(error.message || "Server error");
    }
  },
};