import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "./query";

export const useUsers = (skip = false) => {
  const { data, loading, error } = useQuery(GET_USERS, { skip });

  return {
    status: data?.getUser?.status,
    data: data?.getUser?.result,
    errorMessage: data?.getUser?.errorMessage,
    loading,
    error,
  };
};