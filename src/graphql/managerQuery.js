import { useQuery } from "@apollo/client/react";
import { GQL_ENDPOINT } from "../config";
import { getToken } from "../utils/auth";
import { GET_MANAGERS } from "./query";

export const useManagers = () => {
  const { data, loading, error } = useQuery(GET_MANAGERS);

  return {
    status: data?.getAllManagers?.status,
    data: data?.getAllManagers?.results,
    errorMessage: data?.getAllManagers?.errorMessage,
    loading,
    error,
  };
};